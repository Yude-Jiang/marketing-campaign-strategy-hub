export type ProductIntakeStatus =
  | 'empty'
  | 'uploading'
  | 'parsing'
  | 'ready_to_confirm'
  | 'confirmed'
  | 'error';

export interface ProductMetaInput {
  productName: string;
  productFamily?: string;
  brand?: string;
  targetRegion?: string;
  targetIndustries?: string[];
  businessGoal?: string;
  knownCompetitors?: string[];
  productUrl?: string;
}

export interface ProductTruthModel {
  category: string;
  coreFeatures: string[];
  keySpecs: { label: string; value: string }[];
  differentiators: string[];
  proofPoints: string[];
  limitations?: string[];
}
