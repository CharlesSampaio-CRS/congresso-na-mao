import { useState, useEffect } from 'react';
import type { Proposal, Deputy, Vote, ProposalFilters, DeputyFilters } from '@/types/political';

// Mock data - Em produção, isso seria substituído por chamadas reais à API
const mockProposals: Proposal[] = [
  {
    id: '1',
    number: 'PEC 32/2020',
    type: 'PEC',
    title: 'Reforma Administrativa - Altera disposições sobre servidores, empregados públicos e organização administrativa',
    summary: 'Modifica o regime jurídico dos servidores públicos e a organização administrativa direta e indireta.',
    author: 'Poder Executivo',
    status: 'em_tramitacao',
    date: '2020-09-03',
  },
  {
    id: '2',
    number: 'PL 2630/2020',
    type: 'PL',
    title: 'Lei Brasileira de Liberdade, Responsabilidade e Transparência na Internet',
    summary: 'Institui a Lei Brasileira de Liberdade, Responsabilidade e Transparência na Internet.',
    author: 'Sen. Alessandro Vieira',
    status: 'em_tramitacao',
    date: '2020-05-07',
  },
  {
    id: '3',
    number: 'PEC 95/2016',
    type: 'PEC',
    title: 'Novo Regime Fiscal',
    summary: 'Institui o Novo Regime Fiscal no âmbito dos Orçamentos Fiscal e da Seguridade Social da União.',
    author: 'Poder Executivo',
    status: 'aprovado',
    date: '2016-06-15',
  },
  {
    id: '4',
    number: 'PL 1179/2020',
    type: 'PL',
    title: 'Marco Legal do Saneamento Básico',
    summary: 'Atualiza o marco legal do saneamento básico e altera a Lei nº 9.984, de 17 de julho de 2000.',
    author: 'Sen. Tasso Jereissati',
    status: 'aprovado',
    date: '2020-03-11',
  },
];

const mockDeputies: Deputy[] = [
  {
    id: '1',
    name: 'Arthur Oliveira Maia',
    party: 'DEM',
    state: 'BA',
  },
  {
    id: '2',
    name: 'Gleisi Helena Hoffmann',
    party: 'PT',
    state: 'PR',
  },
  {
    id: '3',
    name: 'Rodrigo Maia',
    party: 'DEM',
    state: 'RJ',
  },
  {
    id: '4',
    name: 'Marcelo Freixo',
    party: 'PSOL',
    state: 'RJ',
  },
  {
    id: '5',
    name: 'Joice Hasselmann',
    party: 'PSL',
    state: 'SP',
  },
  {
    id: '6',
    name: 'Alessandro Molon',
    party: 'PSB',
    state: 'RJ',
  },
];

const mockVotes: Vote[] = [
  { id: '1', deputyId: '1', proposalId: '1', vote: 'FAVOR', date: '2021-05-12' },
  { id: '2', deputyId: '2', proposalId: '1', vote: 'CONTRA', date: '2021-05-12' },
  { id: '3', deputyId: '3', proposalId: '1', vote: 'FAVOR', date: '2021-05-12' },
  { id: '4', deputyId: '4', proposalId: '1', vote: 'CONTRA', date: '2021-05-12' },
  { id: '5', deputyId: '5', proposalId: '1', vote: 'ABSTENCAO', date: '2021-05-12' },
  { id: '6', deputyId: '6', proposalId: '1', vote: 'AUSENTE', date: '2021-05-12' },
  { id: '7', deputyId: '1', proposalId: '2', vote: 'CONTRA', date: '2021-08-03' },
  { id: '8', deputyId: '2', proposalId: '2', vote: 'FAVOR', date: '2021-08-03' },
  { id: '9', deputyId: '3', proposalId: '2', vote: 'FAVOR', date: '2021-08-03' },
  { id: '10', deputyId: '4', proposalId: '2', vote: 'FAVOR', date: '2021-08-03' },
];

export function usePoliticalData() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [deputies, setDeputies] = useState<Deputy[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento da API
    const loadData = async () => {
      setLoading(true);
      // Simula delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProposals(mockProposals);
      setDeputies(mockDeputies);
      setVotes(mockVotes);
      setLoading(false);
    };

    loadData();
  }, []);

  const filterProposals = (filters: ProposalFilters, searchTerm: string = '') => {
    return proposals.filter(proposal => {
      const matchesSearch = !searchTerm || 
        proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = !filters.type || proposal.type === filters.type;
      const matchesStatus = !filters.status || proposal.status === filters.status;
      const matchesAuthor = !filters.author || 
        proposal.author.toLowerCase().includes(filters.author.toLowerCase());

      return matchesSearch && matchesType && matchesStatus && matchesAuthor;
    });
  };

  const filterDeputies = (filters: DeputyFilters, searchTerm: string = '') => {
    return deputies.filter(deputy => {
      const matchesSearch = !searchTerm || 
        deputy.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesName = !filters.name || 
        deputy.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesParty = !filters.party || 
        deputy.party.toLowerCase().includes(filters.party.toLowerCase());
      const matchesState = !filters.state || deputy.state === filters.state;

      return matchesSearch && matchesName && matchesParty && matchesState;
    });
  };

  const getVotesForProposal = (proposalId: string) => {
    return votes.filter(vote => vote.proposalId === proposalId);
  };

  const getVotesForDeputy = (deputyId: string) => {
    return votes.filter(vote => vote.deputyId === deputyId);
  };

  const getDeputyVoteCount = (deputyId: string) => {
    return votes.filter(vote => vote.deputyId === deputyId).length;
  };

  const getDeputyLastVoteDate = (deputyId: string) => {
    const deputyVotes = votes.filter(vote => vote.deputyId === deputyId);
    if (deputyVotes.length === 0) return undefined;
    
    const lastVote = deputyVotes.reduce((latest, vote) => {
      return new Date(vote.date) > new Date(latest.date) ? vote : latest;
    });
    
    return lastVote.date;
  };

  return {
    proposals,
    deputies,
    votes,
    loading,
    filterProposals,
    filterDeputies,
    getVotesForProposal,
    getVotesForDeputy,
    getDeputyVoteCount,
    getDeputyLastVoteDate,
  };
}