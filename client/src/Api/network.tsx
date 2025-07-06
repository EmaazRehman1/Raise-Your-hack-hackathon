import { BASE_URL } from "@/env";

export const getUsers=async()=>{
    try{

        const response=await fetch(`${BASE_URL}/users`, {
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

export const getUser=async()=>{
    try{

        const response=await fetch(`${BASE_URL}/user`, {
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

export const updateUser=async(id:string,body:any)=>{
    try{

        const response=await fetch(`${BASE_URL}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
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