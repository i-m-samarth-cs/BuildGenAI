import { User } from './auth';

export interface DesignGeneration {
  id: string;
  userId: string;
  title: string;
  prompt: string;
  response: string;
  createdAt: string;
}

export const saveDesign = (user: User, title: string, prompt: string, response: string): DesignGeneration => {
  const designs = getUserDesigns(user.id);
  const newDesign: DesignGeneration = {
    id: Math.random().toString(36).substring(2, 9),
    userId: user.id,
    title,
    prompt,
    response,
    createdAt: new Date().toISOString(),
  };
  designs.unshift(newDesign);
  
  // Also store globally for marketplace (simulated public feed)
  const allDesigns = getAllDesigns();
  allDesigns.unshift(newDesign);
  localStorage.setItem('buildgen_all_designs', JSON.stringify(allDesigns));

  localStorage.setItem(`buildgen_designs_${user.id}`, JSON.stringify(designs));
  return newDesign;
};

export const getUserDesigns = (userId: string): DesignGeneration[] => {
  const data = localStorage.getItem(`buildgen_designs_${userId}`);
  return data ? JSON.parse(data) : [];
};

export const getAllDesigns = (): DesignGeneration[] => {
  const data = localStorage.getItem('buildgen_all_designs');
  return data ? JSON.parse(data) : [];
};
