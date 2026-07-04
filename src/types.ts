export interface ProposalConfig {
  proposerName: string;
  partnerName: string;
  questionText: string;
  yesButtonText: string;
  noButtonText: string;
  themeColor: 'rose' | 'lavender' | 'emerald' | 'amber';
}

export interface NoStep {
  id: number;
  emoji: string;
  heading: string;
  subheading: string;
  gifType: 'pout' | 'cry' | 'desperate';
}
