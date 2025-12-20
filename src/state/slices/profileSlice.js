import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        firstName: "Nayibe Patricia",
        lastName: "Casas Pelaez",
        role: "Operario",
        email: "nayibe.casas@parking.net.co",
        documentType: "Cédula de Ciudadanía",
        noIdentifier: "1234567890",
        birthDate: "11/05/2000",
        gender: "Femenino",
        phone: "3112435678",
        city: "Ubaté",
        address: "Calle 5 #24-16 pq.maria",
        avatar: "avatar"
    }
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

    },
});

export const {
    
} = profileSlice.actions;

export default profileSlice.reducer;