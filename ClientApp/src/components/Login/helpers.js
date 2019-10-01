export const getJwt=()=>{
    return localStorage.getItem('jwtToken');
}
export const deleteJwt=()=>{
    return localStorage.removeItem('jwtToken');
}