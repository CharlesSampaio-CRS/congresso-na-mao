import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { ProposalFilters, DeputyFilters } from "@/types/political";

interface SearchFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  proposalFilters: ProposalFilters;
  onProposalFiltersChange: (filters: ProposalFilters) => void;
  deputyFilters: DeputyFilters;
  onDeputyFiltersChange: (filters: DeputyFilters) => void;
}

export function SearchFilters({
  isOpen,
  onClose,
  searchTerm,
  onSearchChange,
  proposalFilters,
  onProposalFiltersChange,
  deputyFilters,
  onDeputyFiltersChange
}: SearchFiltersProps) {
  const [activeTab, setActiveTab] = useState<'proposals' | 'deputies'>('proposals');

  if (!isOpen) return null;

  const clearProposalFilters = () => {
    onProposalFiltersChange({});
  };

  const clearDeputyFilters = () => {
    onDeputyFiltersChange({});
  };

  const getActiveFiltersCount = () => {
    const proposalCount = Object.values(proposalFilters).filter(Boolean).length;
    const deputyCount = Object.values(deputyFilters).filter(Boolean).length;
    return activeTab === 'proposals' ? proposalCount : deputyCount;
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40">
      <Card className="absolute top-20 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-96 max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span className="font-semibold">Filtros e Busca</span>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="text-xs">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Tab Selection */}
          <div className="flex space-x-1 bg-muted p-1 rounded-md">
            <Button
              variant={activeTab === 'proposals' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('proposals')}
              className="flex-1"
            >
              PEC/PL
            </Button>
            <Button
              variant={activeTab === 'deputies' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('deputies')}
              className="flex-1"
            >
              Deputados
            </Button>
          </div>

          {/* Proposal Filters */}
          {activeTab === 'proposals' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Filtros de Proposições</span>
                {Object.values(proposalFilters).some(Boolean) && (
                  <Button variant="ghost" size="sm" onClick={clearProposalFilters}>
                    Limpar
                  </Button>
                )}
              </div>

              <Select
                value={proposalFilters.type || ''}
                onValueChange={(value) =>
                  onProposalFiltersChange({ ...proposalFilters, type: value as 'PEC' | 'PL' })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os tipos</SelectItem>
                  <SelectItem value="PEC">PEC</SelectItem>
                  <SelectItem value="PL">PL</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={proposalFilters.status || ''}
                onValueChange={(value) =>
                  onProposalFiltersChange({ ...proposalFilters, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os status</SelectItem>
                  <SelectItem value="em_tramitacao">Em Tramitação</SelectItem>
                  <SelectItem value="aprovado">Aprovado</SelectItem>
                  <SelectItem value="rejeitado">Rejeitado</SelectItem>
                  <SelectItem value="arquivado">Arquivado</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Autor"
                value={proposalFilters.author || ''}
                onChange={(e) =>
                  onProposalFiltersChange({ ...proposalFilters, author: e.target.value })
                }
              />
            </div>
          )}

          {/* Deputy Filters */}
          {activeTab === 'deputies' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Filtros de Deputados</span>
                {Object.values(deputyFilters).some(Boolean) && (
                  <Button variant="ghost" size="sm" onClick={clearDeputyFilters}>
                    Limpar
                  </Button>
                )}
              </div>

              <Input
                placeholder="Nome do deputado"
                value={deputyFilters.name || ''}
                onChange={(e) =>
                  onDeputyFiltersChange({ ...deputyFilters, name: e.target.value })
                }
              />

              <Input
                placeholder="Partido"
                value={deputyFilters.party || ''}
                onChange={(e) =>
                  onDeputyFiltersChange({ ...deputyFilters, party: e.target.value })
                }
              />

              <Select
                value={deputyFilters.state || ''}
                onValueChange={(value) =>
                  onDeputyFiltersChange({ ...deputyFilters, state: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os estados</SelectItem>
                  <SelectItem value="AC">AC</SelectItem>
                  <SelectItem value="AL">AL</SelectItem>
                  <SelectItem value="AP">AP</SelectItem>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="BA">BA</SelectItem>
                  <SelectItem value="CE">CE</SelectItem>
                  <SelectItem value="DF">DF</SelectItem>
                  <SelectItem value="ES">ES</SelectItem>
                  <SelectItem value="GO">GO</SelectItem>
                  <SelectItem value="MA">MA</SelectItem>
                  <SelectItem value="MT">MT</SelectItem>
                  <SelectItem value="MS">MS</SelectItem>
                  <SelectItem value="MG">MG</SelectItem>
                  <SelectItem value="PA">PA</SelectItem>
                  <SelectItem value="PB">PB</SelectItem>
                  <SelectItem value="PR">PR</SelectItem>
                  <SelectItem value="PE">PE</SelectItem>
                  <SelectItem value="PI">PI</SelectItem>
                  <SelectItem value="RJ">RJ</SelectItem>
                  <SelectItem value="RN">RN</SelectItem>
                  <SelectItem value="RS">RS</SelectItem>
                  <SelectItem value="RO">RO</SelectItem>
                  <SelectItem value="RR">RR</SelectItem>
                  <SelectItem value="SC">SC</SelectItem>
                  <SelectItem value="SP">SP</SelectItem>
                  <SelectItem value="SE">SE</SelectItem>
                  <SelectItem value="TO">TO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}