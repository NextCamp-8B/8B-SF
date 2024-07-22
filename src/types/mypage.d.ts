export type SectionType = 'profile' | 'language' | 'terms';

export type UpdateResponse = {
  data?: {
    user: {
      user_metadata: Record<string, any>;
    };
  };
  error?: string;
};
