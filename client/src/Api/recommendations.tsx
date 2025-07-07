import { BASE_URL } from "@/env";

export const getRecommendations=async()=>{
    try{

        const response=await fetch(`${BASE_URL}/recommendations`, {
            method: 'GET',
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

export const getSessions=async()=>{
    try{

        const response=await fetch(`${BASE_URL}/sessions`, {
            method: 'GET',
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

export const getBooths=async()=>{
    try{

        const response=await fetch(`${BASE_URL}/booths`, {
            method: 'GET',
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