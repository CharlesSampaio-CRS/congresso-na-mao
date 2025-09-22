import { X, ThumbsUp, ThumbsDown, Minus, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Proposal, Vote, Deputy } from "@/types/political";

interface VoteModalProps {
  proposal: Proposal;
  votes: Vote[];
  deputies: Deputy[];
  onClose: () => void;
}

export function VoteModal({ proposal, votes, deputies, onClose }: VoteModalProps) {
  const getVoteIcon = (vote: string) => {
    switch (vote) {
      case 'FAVOR':
        return <ThumbsUp className="h-4 w-4 text-success" />;
      case 'CONTRA':
        return <ThumbsDown className="h-4 w-4 text-destructive" />;
      case 'ABSTENCAO':
        return <Minus className="h-4 w-4 text-warning" />;
      case 'AUSENTE':
        return <UserX className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getVoteBadgeVariant = (vote: string) => {
    switch (vote) {
      case 'FAVOR':
        return 'default';
      case 'CONTRA':
        return 'destructive';
      case 'ABSTENCAO':
        return 'secondary';
      case 'AUSENTE':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getVoteLabel = (vote: string) => {
    switch (vote) {
      case 'FAVOR':
        return 'Favorável';
      case 'CONTRA':
        return 'Contrário';
      case 'ABSTENCAO':
        return 'Abstenção';
      case 'AUSENTE':
        return 'Ausente';
      default:
        return vote;
    }
  };

  const getDeputyName = (deputyId: string) => {
    const deputy = deputies.find(d => d.id === deputyId);
    return deputy?.name || 'Deputado não encontrado';
  };

  const getDeputyInfo = (deputyId: string) => {
    const deputy = deputies.find(d => d.id === deputyId);
    return deputy || null;
  };

  const voteGroups = votes.reduce((acc, vote) => {
    if (!acc[vote.vote]) {
      acc[vote.vote] = [];
    }
    acc[vote.vote].push(vote);
    return acc;
  }, {} as Record<string, Vote[]>);

  const voteCounts = {
    FAVOR: voteGroups.FAVOR?.length || 0,
    CONTRA: voteGroups.CONTRA?.length || 0,
    ABSTENCAO: voteGroups.ABSTENCAO?.length || 0,
    AUSENTE: voteGroups.AUSENTE?.length || 0,
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={proposal.type === 'PEC' ? 'bg-warning text-warning-foreground' : 'bg-primary text-primary-foreground'}>
                {proposal.type}
              </Badge>
              <span className="font-mono text-sm text-muted-foreground">
                {proposal.number}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-foreground line-clamp-2">
              {proposal.title}
            </h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Vote Summary */}
        <div className="p-4 border-b bg-muted/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <ThumbsUp className="h-4 w-4 text-success" />
                <span className="font-semibold text-success">{voteCounts.FAVOR}</span>
              </div>
              <p className="text-xs text-muted-foreground">Favoráveis</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <ThumbsDown className="h-4 w-4 text-destructive" />
                <span className="font-semibold text-destructive">{voteCounts.CONTRA}</span>
              </div>
              <p className="text-xs text-muted-foreground">Contrários</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Minus className="h-4 w-4 text-warning" />
                <span className="font-semibold text-warning">{voteCounts.ABSTENCAO}</span>
              </div>
              <p className="text-xs text-muted-foreground">Abstenções</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <UserX className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold text-muted-foreground">{voteCounts.AUSENTE}</span>
              </div>
              <p className="text-xs text-muted-foreground">Ausentes</p>
            </div>
          </div>
        </div>

        {/* Vote List */}
        <ScrollArea className="flex-1 p-4 max-h-96">
          <div className="space-y-3">
            {votes.map((vote) => {
              const deputy = getDeputyInfo(vote.deputyId);
              return (
                <div
                  key={`${vote.deputyId}-${vote.proposalId}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-card border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={deputy?.photo} alt={deputy?.name} />
                      <AvatarFallback className="text-xs">
                        {deputy?.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <p className="font-medium text-sm">{getDeputyName(vote.deputyId)}</p>
                      {deputy && (
                        <p className="text-xs text-muted-foreground">
                          {deputy.party} - {deputy.state}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">
                      {new Date(vote.date).toLocaleDateString('pt-BR')}
                    </span>
                    <Badge variant={getVoteBadgeVariant(vote.vote)} className="flex items-center space-x-1">
                      {getVoteIcon(vote.vote)}
                      <span className="text-xs">{getVoteLabel(vote.vote)}</span>
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}