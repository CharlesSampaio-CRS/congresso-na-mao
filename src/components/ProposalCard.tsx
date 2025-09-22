import { Calendar, User, FileText, Vote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Proposal } from "@/types/political";

interface ProposalCardProps {
  proposal: Proposal;
  onViewVotes: (proposal: Proposal) => void;
}

export function ProposalCard({ proposal, onViewVotes }: ProposalCardProps) {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'aprovado':
        return 'default';
      case 'rejeitado':
        return 'destructive';
      case 'em_tramitacao':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getTypeColor = (type: 'PEC' | 'PL') => {
    return type === 'PEC' ? 'bg-warning text-warning-foreground' : 'bg-primary text-primary-foreground';
  };

  return (
    <Card className="p-4 hover:shadow-md transition-all duration-200 hover:border-primary/20">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Badge className={`${getTypeColor(proposal.type)} font-medium`}>
            {proposal.type}
          </Badge>
          <Badge variant={getStatusVariant(proposal.status)}>
            {proposal.status.replace('_', ' ')}
          </Badge>
        </div>
        <span className="text-sm font-mono text-muted-foreground">
          {proposal.number}
        </span>
      </div>

      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
        {proposal.title}
      </h3>

      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {proposal.summary}
      </p>

      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
        <div className="flex items-center space-x-1">
          <User className="h-3 w-3" />
          <span>{proposal.author}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="h-3 w-3" />
          <span>{new Date(proposal.date).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <FileText className="h-3 w-3" />
          <span>Ver detalhes</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewVotes(proposal)}
          className="hover:bg-primary hover:text-primary-foreground"
        >
          <Vote className="h-3 w-3 mr-1" />
          Votos
        </Button>
      </div>
    </Card>
  );
}