import { BASE_URL } from "@/env";

export const chatbot=async(question:string)=>{
    try{

        const response=await fetch(`${BASE_URL}/chat?q=${question}`, {
            method: 'GET'
        })
        if (!response.ok) {
            throw new Error('Failed to fetch matches');
        }
        const data = await response.json();
        return data;
    }catch (error) {
        console.error('Error fetching matches:', error);
        throw error; // Re-throw the error for further handling if needed
    }

}