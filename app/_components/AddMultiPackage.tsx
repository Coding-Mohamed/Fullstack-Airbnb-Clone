// "use client";
// import React from "react";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import app from "../../firebaseConfig"; // Assuming your Firebase config is here

// const firestore = getFirestore(app);

// const AddMultiPackage: React.FC = () => {
//   const predefinedPackages = [
//     {
//       id: 1,
//       title: "Cozy Cottage",
//       location: "Stockholm",
//       price: 150,
//       description: "A charming cottage in the heart of Stockholm, perfect for a weekend getaway.",
//       number_of_bedrooms: 2,
//       number_of_bathrooms: 1,
//       amenities: ["WiFi", "Air conditioning", "Kitchen"],
//       images: [
//         "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q296eSUyMENvdHRhZ2V8ZW58MHx8MHx8fDA%3D", // Stockholm city view
//         "https://images.unsplash.com/photo-1600509736548-95031c8d6050?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RvY2tob2xtJTIwdG93bnxlbnwwfHwwfHx8MA%3D%3D", // Cozy interior
//         "https://images.unsplash.com/photo-1600509737620-986873066e64?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN0b2NraG9sbSUyMHRvd258ZW58MHx8MHx8fDA%3D", // Swedish countryside
//       ],
//     },
//     {
//       id: 2,
//       title: "Modern Apartment",
//       location: "Stockholm",
//       price: 220,
//       description: "A modern apartment located in the heart of Stockholm.",
//       number_of_bedrooms: 3,
//       number_of_bathrooms: 2,
//       amenities: ["Pool", "Gym", "Free parking", "Kitchen"],
//       images: [
//         "https://images.unsplash.com/photo-1567450475889-be13747d4586?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fE1vZGVybiUyMEFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D", // Swedish countryside
//         "https://images.unsplash.com/photo-1600509736548-95031c8d6050?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RvY2tob2xtJTIwdG93bnxlbnwwfHwwfHx8MA%3D%3D", // Cozy interior
//         "https://images.unsplash.com/photo-1508189860359-777d945909ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3RvY2tob2xtfGVufDB8fDB8fHww", // Stockholm city view
//       ],
//     },
//     {
//       id: 3,
//       title: "Luxury Penthouse",
//       location: "Stockholm",
//       price: 400,
//       description: "A luxurious penthouse with stunning city views of Stockholm.",
//       number_of_bedrooms: 4,
//       number_of_bathrooms: 3,
//       amenities: ["WiFi", "Gym", "Pool", "Rooftop terrace"],
//       images: [
//         "https://images.unsplash.com/photo-1496328488450-9c5c5d555148?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8THV4dXJ5JTIwUGVudGhvdXNlfGVufDB8fDB8fHww", // Stockholm city view
//         "https://images.unsplash.com/photo-1600509736548-95031c8d6050?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RvY2tob2xtJTIwdG93bnxlbnwwfHwwfHx8MA%3D%3D", // Cozy interior
//         "https://images.unsplash.com/photo-1600509737620-986873066e64?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN0b2NraG9sbSUyMHRvd258ZW58MHx8MHx8fDA%3D", // Swedish countryside
//       ],
//     },
//     {
//       id: 4,
//       title: "Seaside Villa",
//       location: "Stockholm",
//       price: 500,
//       description: "A beautiful seaside villa located just outside Stockholm.",
//       number_of_bedrooms: 5,
//       number_of_bathrooms: 4,
//       amenities: ["Pool", "Beachfront", "WiFi", "Air conditioning"],
//       images: [
//         "https://images.unsplash.com/photo-1626096181598-9d31320fa9bf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fFNlYXNpZGUlMjBWaWxsYXxlbnwwfHwwfHx8MA%3D%3D", // Stockholm city view
//         "https://images.unsplash.com/photo-1600509736548-95031c8d6050?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RvY2tob2xtJTIwdG93bnxlbnwwfHwwfHx8MA%3D%3D", // Cozy interior
//         "https://images.unsplash.com/photo-1599550344509-9f53c496909c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHN0b2NraG9sbSUyMHRvd258ZW58MHx8MHx8fDA%3D", // Swedish countryside
//       ],
//     },

//     {
//       id: 5,
//       title: "Downtown Loft",
//       location: "Oslo",
//       price: 200,
//       description: "A stylish loft located in the bustling downtown area of Oslo.",
//       number_of_bedrooms: 2,
//       number_of_bathrooms: 1,
//       amenities: ["WiFi", "Kitchen", "Washer", "Dryer"],
//       images: [
//         "https://images.unsplash.com/photo-1632066809030-18333b2b54c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fERvd250b3duJTIwTG9mdHxlbnwwfHwwfHx8MA%3D%3D", // Oslo downtown
//         "https://images.unsplash.com/photo-1551041047-3b5146fdf536?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG9zbG8lMjB0b3dufGVufDB8fDB8fHww", // Loft interior
//         "https://images.unsplash.com/photo-1600905200589-adcfcb050d87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG9zbG8lMjB0b3dufGVufDB8fDB8fHww", // Oslo street view
//       ],
//     },
//     {
//       id: 6,
//       title: "Luxury Villa",
//       location: "Oslo",
//       price: 450,
//       description: "A luxurious villa with breathtaking views of the Oslo fjords.",
//       number_of_bedrooms: 5,
//       number_of_bathrooms: 4,
//       amenities: ["Pool", "Gym", "Home theater", "Hot tub"],
//       images: [
//         "https://images.unsplash.com/photo-1622015663319-e97e697503ee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEx1eHVyeSUyMFZpbGxhfGVufDB8fDB8fHww", // Loft interior
//         "https://images.unsplash.com/photo-1608914876485-4e48b8d4b6c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3NsbyUyMHRvd258ZW58MHx8MHx8fDA%3D", // Oslo downtown
//         "https://images.unsplash.com/photo-1600905200589-adcfcb050d87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG9zbG8lMjB0b3dufGVufDB8fDB8fHww", // Oslo street view
//       ],
//     },
//     {
//       id: 7,
//       title: "Mountain Cabin",
//       location: "Oslo",
//       price: 300,
//       description: "A secluded cabin in the Oslo mountains, perfect for nature lovers.",
//       number_of_bedrooms: 3,
//       number_of_bathrooms: 2,
//       amenities: ["Fireplace", "Mountain view", "WiFi", "Hot tub"],
//       images: [
//         "https://images.unsplash.com/photo-1482192505345-5655af888cc4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TW91bnRhaW4lMjBDYWJpbnxlbnwwfHwwfHx8MA%3D%3D", // Oslo street view
//         "https://images.unsplash.com/photo-1608914876485-4e48b8d4b6c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3NsbyUyMHRvd258ZW58MHx8MHx8fDA%3D", // Oslo downtown
//         "https://images.unsplash.com/photo-1551041047-3b5146fdf536?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG9zbG8lMjB0b3dufGVufDB8fDB8fHww", // Loft interior
//       ],
//     },
//     {
//       id: 8,
//       title: "City Apartment",
//       location: "Oslo",
//       price: 250,
//       description: "A beautiful city apartment located in central Oslo.",
//       number_of_bedrooms: 2,
//       number_of_bathrooms: 2,
//       amenities: ["WiFi", "Kitchen", "Washer", "Gym"],
//       images: [
//         "https://images.unsplash.com/photo-1515120263166-b676e1f61045?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q2l0eSUyMEFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D", // Oslo downtown
//         "https://images.unsplash.com/photo-1551041047-3b5146fdf536?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG9zbG8lMjB0b3dufGVufDB8fDB8fHww", // Loft interior
//         "https://images.unsplash.com/photo-1600905200589-adcfcb050d87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG9zbG8lMjB0b3dufGVufDB8fDB8fHww", // Oslo street view
//       ],
//     },

//     {
//       id: 9,
//       title: "Modern Apartment",
//       location: "Helsinki",
//       price: 240,
//       description: "A sleek and modern apartment located in the heart of Helsinki.",
//       number_of_bedrooms: 3,
//       number_of_bathrooms: 2,
//       amenities: ["Pool", "Gym", "Free parking", "Kitchen"],
//       images: ["https://images.unsplash.com/photo-1654200150895-5be29dc62762?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fE1vZGVybiUyMEFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D", "https://images.unsplash.com/photo-1589732055744-04ff52713977?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhlbHNpbmtpJTIwdG93bnxlbnwwfHwwfHx8MA%3D%3D", "https://images.unsplash.com/photo-1634316887837-21c8e53f7371?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVsc2lua2klMjB0b3dufGVufDB8fDB8fHww"],
//     },
//     {
//       id: 10,
//       title: "Seaside Bungalow",
//       location: "Helsinki",
//       price: 320,
//       description: "A peaceful seaside bungalow near Helsinki, perfect for relaxation.",
//       number_of_bedrooms: 2,
//       number_of_bathrooms: 1,
//       amenities: ["Beachfront", "WiFi", "Kitchen", "Patio"],
//       images: ["https://images.unsplash.com/photo-1565792033142-367425b1c724?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U2Vhc2lkZSUyMEJ1bmdhbG93fGVufDB8fDB8fHww", "https://images.unsplash.com/photo-1611570266699-4b201348481b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVsc2lua2klMjB0b3dufGVufDB8fDB8fHww", "https://images.unsplash.com/photo-1634316887837-21c8e53f7371?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVsc2lua2klMjB0b3dufGVufDB8fDB8fHww"],
//     },
//     {
//       id: 11,
//       title: "Luxury Penthouse",
//       location: "Helsinki",
//       price: 450,
//       description: "A luxury penthouse with panoramic views of Helsinki.",
//       number_of_bedrooms: 3,
//       number_of_bathrooms: 2,
//       amenities: ["WiFi", "Gym", "Hot tub", "Terrace"],
//       images: ["https://images.unsplash.com/photo-1649769425648-078160aeec2c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEx1eHVyeSUyMFBlbnRob3VzZXxlbnwwfHwwfHx8MA%3D%3D", "https://images.unsplash.com/photo-1589732055744-04ff52713977?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhlbHNpbmtpJTIwdG93bnxlbnwwfHwwfHx8MA%3D%3D", "https://images.unsplash.com/photo-1634316887837-21c8e53f7371?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVsc2lua2klMjB0b3dufGVufDB8fDB8fHww"],
//     },
//     {
//       id: 12,
//       title: "City Loft",
//       location: "Helsinki",
//       price: 280,
//       description: "A stylish loft located in the heart of Helsinki, perfect for a city break.",
//       number_of_bedrooms: 2,
//       number_of_bathrooms: 1,
//       amenities: ["WiFi", "Kitchen", "Washer", "City view"],
//       images: ["https://images.unsplash.com/photo-1555400082-1a2152f840b1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fENpdHklMjBMb2Z0fGVufDB8fDB8fHww", "https://images.unsplash.com/photo-1589732055744-04ff52713977?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhlbHNpbmtpJTIwdG93bnxlbnwwfHwwfHx8MA%3D%3D", "https://images.unsplash.com/photo-1634316887837-21c8e53f7371?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVsc2lua2klMjB0b3dufGVufDB8fDB8fHww"],
//     },

//     {
//       id: 13,
//       title: "Seaside Retreat",
//       location: "Copenhagen",
//       price: 350,
//       description: "A beautiful retreat near Copenhagen’s coastline, perfect for nature lovers.",
//       number_of_bedrooms: 4,
//       number_of_bathrooms: 3,
//       amenities: ["WiFi", "Hot tub", "Fireplace", "Ocean view"],
//       images: ["https://images.unsplash.com/photo-1582983560672-ab41be5d05a4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U2Vhc2lkZSUyMFJldHJlYXR8ZW58MHx8MHx8fDA%3D", "https://images.unsplash.com/photo-1454193429078-c17d1788287a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29wZW5oZWdhbiUyMHRvd258ZW58MHx8MHx8fDA%3D", "https://images.unsplash.com/photo-1523562457378-685782b382a6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29wZW5oZWdhbiUyMHRvd258ZW58MHx8MHx8fDA%3D"],
//     },
//     {
//       id: 14,
//       title: "Luxury Villa",
//       location: "Copenhagen",
//       price: 450,
//       description: "A luxurious villa with beautiful sea views in Copenhagen.",
//       number_of_bedrooms: 5,
//       number_of_bathrooms: 4,
//       amenities: ["Pool", "WiFi", "Home theater", "Fireplace"],
//       images: [
//         "https://images.unsplash.com/photo-1717167398817-121e3c283dbb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEx1eHVyeSUyMFZpbGxhfGVufDB8fDB8fHww", // Villa exterior
//         "https://images.unsplash.com/photo-1519681393784-d120267933ba",
//         "https://images.unsplash.com/photo-1570172619646-d2e5492d8bcd",
//       ],
//     },
//     {
//       id: 15,
//       title: "City Apartment",
//       location: "Copenhagen",
//       price: 250,
//       description: "A beautiful city apartment located in central Copenhagen.",
//       number_of_bedrooms: 3,
//       number_of_bathrooms: 2,
//       amenities: ["WiFi", "Gym", "Kitchen", "Rooftop terrace"],
//       images: [
//         "https://plus.unsplash.com/premium_photo-1661905792999-036ddbe402a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q2l0eSUyMEFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D", // Apartment view
//         "https://images.unsplash.com/photo-1532339142469-f6a7317da3f6",
//         "https://images.unsplash.com/photo-1499933374294-4584851497dd",
//       ],
//     },
//     {
//       id: 16,
//       title: "Beach House",
//       location: "Copenhagen",
//       price: 320,
//       description: "A peaceful beach house located near Copenhagen’s beautiful beaches.",
//       number_of_bedrooms: 4,
//       number_of_bathrooms: 3,
//       amenities: ["Beachfront", "WiFi", "Air conditioning", "Fireplace"],
//       images: [
//         "https://images.unsplash.com/photo-1455275505851-8e604db9675a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QmVhY2glMjBIb3VzZXxlbnwwfHwwfHx8MA%3D%3D", // Beachfront
//         "https://images.unsplash.com/photo-1545060894-6fc8f8d1a923",
//         "https://images.unsplash.com/photo-1556911073-52527ac437d1",
//       ],
//     },

//     {
//       id: 17,
//       title: "Historic Mansion",
//       location: "Reykjavik",
//       price: 600,
//       description: "A grand, historic mansion with a rich history and luxurious amenities.",
//       number_of_bedrooms: 6,
//       number_of_bathrooms: 5,
//       amenities: ["WiFi", "Garden", "Fireplace", "Library"],
//       images: ["https://images.unsplash.com/photo-1645723947866-4f98043ddc0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8SGlzdG9yaWMlMjBNYW5zaW9ufGVufDB8fDB8fHww", "https://images.unsplash.com/photo-1519710164239-da123dc03ef4", "https://images.unsplash.com/photo-1556911073-52527ac437d1"],
//     },
//     {
//       id: 18,
//       title: "Modern Apartment",
//       location: "Reykjavik",
//       price: 260,
//       description: "A sleek, modern apartment located in the heart of Reykjavik.",
//       number_of_bedrooms: 2,
//       number_of_bathrooms: 1,
//       amenities: ["WiFi", "Kitchen", "Gym", "City view"],
//       images: [
//         "https://images.unsplash.com/photo-1519322308203-4a49330b5c06?q=80&w=2962&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Reykjavik city view
//         "https://images.unsplash.com/photo-1532467946565-cc62c8aa3a42",
//         "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
//       ],
//     },
//     {
//       id: 19,
//       title: "Cabin Retreat",
//       location: "Reykjavik",
//       price: 320,
//       description: "A cozy cabin retreat located in the outskirts of Reykjavik, perfect for nature lovers.",
//       number_of_bedrooms: 3,
//       number_of_bathrooms: 2,
//       amenities: ["WiFi", "Fireplace", "Mountain view", "Hot tub"],
//       images: [
//         "https://images.unsplash.com/photo-1504643039591-52948e3ddb47?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2FiaW4lMjBSZXRyZWF0fGVufDB8fDB8fHww", // Cabin exterior
//         "https://images.unsplash.com/photo-1506466010722-395aa2bef877",
//         "https://images.unsplash.com/photo-1506033066393-2bf56b9324c5",
//       ],
//     },
//     {
//       id: 20,
//       title: "Luxury Penthouse",
//       location: "Reykjavik",
//       price: 450,
//       description: "A luxurious penthouse suite with a breathtaking view of Reykjavik’s skyline.",
//       number_of_bedrooms: 4,
//       number_of_bathrooms: 3,
//       amenities: ["WiFi", "Gym", "Rooftop terrace", "Hot tub"],
//       images: [
//         "https://images.unsplash.com/photo-1469796466635-455ede028aca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fEx1eHVyeSUyMFBlbnRob3VzZXxlbnwwfHwwfHx8MA%3D%3D", // Cabin interior
//         "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
//         "https://images.unsplash.com/photo-1506033066393-2bf56b9324c5",
//       ],
//     },
//     // Add other packages here...
//   ];

//   const addPackagesToFirebase = async () => {
//     try {
//       const batch = predefinedPackages.map(async (pkg) => {
//         await addDoc(collection(firestore, "listings"), pkg);
//       });
//       await Promise.all(batch);
//       alert("All packages added successfully!");
//     } catch (error) {
//       console.error("Error adding packages:", error);
//       alert("There was an error adding the packages.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-6">Add Multiple Packages</h2>
//       <button onClick={addPackagesToFirebase} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg">
//         Add All Packages
//       </button>
//     </div>
//   );
// };

// export default AddMultiPackage;
