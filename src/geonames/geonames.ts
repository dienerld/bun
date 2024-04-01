
import axios from 'axios';

const username = "stella_squality"; // Substitua pelo seu nome de usuário do Geonames

// Função para obter países por continente
async function getCountriesByContinent(continentCode: string) {
    try {
        const response = await axios.get(`http://api.geonames.org/countryInfoJSON?continentCode=${continentCode}&username=${username}`);
    console.log(response.data);
        
    const countries = response.data.geonames.map((country: { countryCode: string, countryName: string }) => ({
            code: country.countryCode,
            name: country.countryName
        }));
        return countries;
    } catch (error) {
        console.error('Erro ao obter países:', error);
        return [];
    }
}

// Função para obter estados de um país
async function getStates(countryCode: string) {
    try {
        const response = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${countryCode}&username=${username}`);
    console.log(response);
    
        const states = response.data.geonames.map((state: { adminCode1: string, name: string }) => ({
            code: state.adminCode1,
            name: state.name
        }));
        return states;
    } catch (error) {
        console.error('Erro ao obter estados:', error);
        return [];
    }
}

// Função para obter cidades de um estado
async function getCities(countryCode: string, stateCode: string) {
    try {
        const response = await axios.get(`http://api.geonames.org/searchJSON?country=${countryCode}&adminCode1=${stateCode}&username=${username}`);
        const cities = response.data.geonames.map((city: { name: string }) => city.name);
        return cities;
    } catch (error) {
        console.error('Erro ao obter cidades:', error);
        return [];
    }
}

// Exemplo de uso
const continentCode = 'EU'; // Código do continente (por exemplo, 'EU' para Europa)

// Obtendo países na Europa
// getCountriesByContinent(continentCode)
//     .then((countries) => {
//         console.log("Lista de países na Europa:");
//         countries.forEach((country: { code: string, name: string }) => {
//             console.log(country.name);
//         });
//         });

const countries = await getCountriesByContinent("EU");
console.log(countries);

        // Supondo que o usuário selecionou um país, por exemplo, Alemanha (código 'DE')
    //     const selectedCountryCode = 'DE';
    //     // Obtendo estados na Alemanha
    //     getStates(selectedCountryCode)
    //         .then((states) => {
    //             console.log("\nEstados na Alemanha:");
    //             states.forEach((state: { code: string, name: string }) => {
    //                 console.log(state.name);
    //             });
    //             // Supondo que o usuário selecionou um estado, por exemplo, Baviera (código '02')
    //             const selectedStateCode = '02';
    //             // Obtendo cidades na Baviera
    //             getCities(selectedCountryCode, selectedStateCode)
    //                 .then((cities) => {
    //                     console.log("\nCidades na Baviera:");
    //                     cities.forEach((city: string) => {
    //                         console.log(city);
    //                     });
    //                 });
    //         });
    // });
