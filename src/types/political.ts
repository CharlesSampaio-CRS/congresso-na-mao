export interface Deputy {
  id: string;
  name: string;
  party: string;
  state: string;
  photo?: string;
}

export interface Vote {
  id: string;
  deputyId: string;
  proposalId: string;
  vote: 'FAVOR' | 'CONTRA' | 'ABSTENCAO' | 'AUSENTE';
  date: string;
}

export interface Proposal {
  id: string;
  number: string;
  type: 'PEC' | 'PL';
  title: string;
  summary: string;
  author: string;
  status: string;
  date: string;
  votes?: Vote[];
}

export interface ProposalFilters {
  type?: 'PEC' | 'PL';
  status?: string;
  author?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface DeputyFilters {
  party?: string;
  state?: string;
  name?: string;
}