import { MapPin, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Deputy } from "@/types/political";

interface DeputyCardProps {
  deputy: Deputy;
  voteCount?: number;
  lastVoteDate?: string;
  onClick?: () => void;
}

export function DeputyCard({ deputy, voteCount, lastVoteDate, onClick }: DeputyCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <Card 
      className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-primary/20"
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={deputy.photo} alt={deputy.name} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {getInitials(deputy.name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">
            {deputy.name}
          </h3>
          
          <div className="flex items-center space-x-3 mt-1">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{deputy.party}</span>
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{deputy.state}</span>
            </div>
          </div>

          {voteCount !== undefined && (
            <div className="flex items-center justify-between mt-2">
              <Badge variant="secondary" className="text-xs">
                {voteCount} votos registrados
              </Badge>
              
              {lastVoteDate && (
                <span className="text-xs text-muted-foreground">
                  Último: {new Date(lastVoteDate).toLocaleDateString('pt-BR')}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}