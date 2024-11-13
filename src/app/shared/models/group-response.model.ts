export interface groupResponse {
    id: number;            
    name: string;          
    description: string;   
    membersCount?: number; 
    createdAt?: Date;
    isPrivate: boolean;
    isPending?: boolean;
}
