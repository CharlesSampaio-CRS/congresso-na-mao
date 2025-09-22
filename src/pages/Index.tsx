import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchFilters } from "@/components/SearchFilters";
import { ProposalCard } from "@/components/ProposalCard";
import { DeputyCard } from "@/components/DeputyCard";
import { VoteModal } from "@/components/VoteModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { usePoliticalData } from "@/hooks/usePoliticalData";
import type { Proposal, ProposalFilters, DeputyFilters } from "@/types/political";

const Index = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [proposalFilters, setProposalFilters] = useState<ProposalFilters>({});
  const [deputyFilters, setDeputyFilters] = useState<DeputyFilters>({});
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [activeTab, setActiveTab] = useState("proposals");

  const {
    proposals,
    deputies,
    votes,
    loading,
    filterProposals,
    filterDeputies,
    getVotesForProposal,
    getDeputyVoteCount,
    getDeputyLastVoteDate,
  } = usePoliticalData();

  const filteredProposals = filterProposals(proposalFilters, searchTerm);
  const filteredDeputies = filterDeputies(deputyFilters, searchTerm);

  const handleViewVotes = (proposal: Proposal) => {
    setSelectedProposal(proposal);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSearchToggle={() => {}} />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-4">
                <Skeleton className="h-6 w-20 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-3/4 mb-4" />
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSearchToggle={() => setSearchOpen(!searchOpen)} />
      
      <SearchFilters
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        proposalFilters={proposalFilters}
        onProposalFiltersChange={setProposalFilters}
        deputyFilters={deputyFilters}
        onDeputyFiltersChange={setDeputyFilters}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{proposals.length}</div>
            <div className="text-sm text-muted-foreground">Proposições</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{deputies.length}</div>
            <div className="text-sm text-muted-foreground">Deputados</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{votes.length}</div>
            <div className="text-sm text-muted-foreground">Votos Registrados</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {proposals.filter(p => p.status === 'aprovado').length}
            </div>
            <div className="text-sm text-muted-foreground">Aprovadas</div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="proposals">
                Proposições
                <Badge variant="secondary" className="ml-2 text-xs">
                  {filteredProposals.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="deputies">
                Deputados
                <Badge variant="secondary" className="ml-2 text-xs">
                  {filteredDeputies.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {(Object.values(proposalFilters).some(Boolean) || Object.values(deputyFilters).some(Boolean) || searchTerm) && (
                <span>Filtros ativos</span>
              )}
            </div>
          </div>

          <TabsContent value="proposals" className="space-y-4">
            {filteredProposals.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  Nenhuma proposição encontrada com os filtros aplicados.
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProposals.map((proposal) => (
                  <ProposalCard
                    key={proposal.id}
                    proposal={proposal}
                    onViewVotes={handleViewVotes}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="deputies" className="space-y-4">
            {filteredDeputies.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  Nenhum deputado encontrado com os filtros aplicados.
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDeputies.map((deputy) => (
                  <DeputyCard
                    key={deputy.id}
                    deputy={deputy}
                    voteCount={getDeputyVoteCount(deputy.id)}
                    lastVoteDate={getDeputyLastVoteDate(deputy.id)}
                    onClick={() => {
                      // Implementar modal de detalhes do deputado
                      console.log('Clicked deputy:', deputy);
                    }}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Vote Modal */}
      {selectedProposal && (
        <VoteModal
          proposal={selectedProposal}
          votes={getVotesForProposal(selectedProposal.id)}
          deputies={deputies}
          onClose={() => setSelectedProposal(null)}
        />
      )}
    </div>
  );
};

export default Index;
