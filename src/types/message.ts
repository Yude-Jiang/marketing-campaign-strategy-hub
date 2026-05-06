/**
 * src/types/message.ts
 * T12: Audience & Message Lab — resonance matrix and experiment types.
 */

export interface MessagePillar {
  id: string;
  name: string;
  coreIdea: string;
}

export interface AudienceSegment {
  id: string;
  label: string;
  role: string;
}

export interface ResonanceCell {
  audienceId: string;
  pillarId: string;
  score: number;
  notes?: string;
}

export interface ExperimentItem {
  id: string;
  hypothesis: string;
  audienceId: string;
  pillarId: string;
  priority: 'high' | 'medium' | 'low';
  status: 'backlog' | 'running' | 'done';
}
