// Assets
import image1 from "../image1.jpg";
import image2 from "../image2.jpg";
import image3 from "../image3.jpg";
import image4 from "../image4.jpg";
import image5 from "../image5.jpg";
import image6 from "../image6.jpg";
import image7 from "../image7.jpg";
import image8 from "../image8.jpg";
import image9 from "../image9.jpg";
import image10 from "../image10.jpg";
import image11 from "../image11.jpg";
import image12 from "../image12.jpg";
import image13 from "../image13.jpg";
import image14 from "../image14.jpg";
import image15 from "../image15.jpg";
import image16 from "../image16.jpg";

const myListings = [
	{
		id: 1,
		title: "Apartment for rent in Camden",
		listing_type: "Profissional",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Inner London",
		borough: "Camden",
		internship_status: "Presencial",
		vacancies: 2,
		internship_bachelor: "Licenciatura",
		total_hours: 4,
		programming_lang_python: false,
		programming_lang_java: false,
		programming_lang_c_1: true,
		programming_lang_c_2: true,
		programming_lang_javascript: true,
		location: {
			type: "Point",
			coordinates: [51.541078280085614, -0.15871891189601836],
		},
		picture1: image3,
	},
	{
		id: 2,
		title: "House for sale in Islington",
		listing_type: "Curricular",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Inner London",
		borough: "Islington",
		internship_status: "Remoto",
		vacancies: 2,
		internship_bachelor: "Licenciatura",
		total_hours: 4,
		programming_lang_python: true,
		programming_lang_java: true,
		programming_lang_c_1: true,
		programming_lang_c_2: true,
		programming_lang_javascript: true,
		location: {
			type: "Point",
			coordinates: [51.53796304347224, -0.10189113898462315],
		},
		picture1: image1,
	},
	{
		id: 3,
		title: "House for sale in Ealing",
		listing_type: "Curricular",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Ealing",
		internship_status: "Remoto",
		vacancies: 3,
		internship_bachelor: "Licenciatura",
		total_hours: 4,
		programming_lang_python: true,
		programming_lang_java: false,
		programming_lang_c_1: true,
		programming_lang_c_2: true,
		programming_lang_javascript: true,
		location: {
			type: "Point",
			coordinates: [51.5117212390057, -0.30023786193990754],
		},
		picture1: image5,
	},
	{
		id: 4,
		title: "Office for sale in Lambeth",
		listing_type: "Voluntário",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Inner London",
		borough: "Lambeth",
		internship_status: "Remoto",
		vacancies: 4,
		internship_bachelor: "Licenciatura",
		total_hours: 4,
		programming_lang_python: true,
		programming_lang_java: false,
		programming_lang_c_1: true,
		programming_lang_c_2: true,
		programming_lang_javascript: true,
		location: {
			type: "Point",
			coordinates: [51.49463731028351, -0.11398489688921488],
		},
		picture1: image4,
	},

	{
		id: 5,
		title: "House for sale in Enfield",
		listing_type: "Curricular",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Enfield",
		internship_status: "Remoto",
		vacancies: 5,
		internship_bachelor: "Licenciatura",
		total_hours: 4,
		programming_lang_python: true,
		programming_lang_java: true,
		programming_lang_c_1: true,
		programming_lang_c_2: true,
		programming_lang_javascript: true,
		location: {
			type: "Point",
			coordinates: [51.6538576327809, -0.07420868326088129],
		},
		picture1: image7,
	},

	{
		id: 6,
		title: "Apartment for rent in Barnet",
		listing_type: "Profissional",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Barnet",
		internship_status: "Presencial",
		vacancies: 6,
		internship_bachelor: "Licenciatura",
		total_hours: 4,
		programming_lang_python: false,
		programming_lang_java: true,
		programming_lang_c_1: true,
		programming_lang_c_2: true,
		programming_lang_javascript: true,
		location: {
			type: "Point",
			coordinates: [51.650243284477725, -0.19749483373918514],
		},
		picture1: image12,
	},

	{
		id: 7,
		title: "Apartment for rent in Bexley",
		listing_type: "Profissional",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Bexley",
		internship_status: "Presencial",
		vacancies: 8,
		internship_bachelor: "Licenciatura",
		total_hours: 4,
		programming_lang_python: true,
		programming_lang_java: true,
		programming_lang_c_1: true,
		programming_lang_c_2: true,
		programming_lang_javascript: true,
		location: {
			type: "Point",
			coordinates: [51.443269130828206, 0.15064128781893238],
		},
		picture1: image15,
	},

	{
		id: 8,
		title: "Office for rent in Croydon",
		listing_type: "Voluntário",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Croydon",
		internship_status: "Presencial",
		vacancies: 1,
		internship_bachelor: "Licenciatura",
		total_hours: 4,
		programming_lang_python: true,
		programming_lang_java: false,
		programming_lang_c_1: true,
		programming_lang_c_2: true,
		programming_lang_javascript: true,
		location: {
			type: "Point",
			coordinates: [51.381870798317266, -0.10379988107433152],
		},
		picture1: image2,
	},

	{
		id: 9,
		title: "House for sale in Hounslow",
		listing_type: "Curricular",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Hounslow",
		internship_status: "Remoto",
		vacancies: 2,
		internship_bachelor: "Licenciatura",
		total_hours: 4,
		programming_lang_python: true,
		programming_lang_java: true,
		programming_lang_c_1: true,
		programming_lang_c_2: true,
		programming_lang_javascript: true,
		location: {
			type: "Point",
			coordinates: [51.462524898313, -0.37050279898417415],
		},
		picture1: image8,
	},

	{
		id: 10,
		title: "Apartment for sale in Hackney",
		listing_type: "Profissional",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Inner London",
		borough: "Hackney",
		internship_status: "Remoto",
		vacancies: 6,
		internship_bachelor: "Licenciatura",
		total_hours: 4,
		programming_lang_python: true,
		programming_lang_java: true,
		programming_lang_c_1: true,
		programming_lang_c_2: true,
		programming_lang_javascript: true,
		location: {
			type: "Point",
			coordinates: [51.552498305814616, -0.047976472350245256],
		},
		picture1: image16,
	},

	{
		id: 11,
		title: "House for rent in Bromley",
		listing_type: "Curricular",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Bromley",
		internship_status: "Remoto",
		vacancies: 8,
		internship_bachelor: "Licenciatura",
		total_hours: 4,
		programming_lang_python: true,
		programming_lang_java: false,
		programming_lang_c_1: true,
		programming_lang_c_2: true,
		programming_lang_javascript: true,
		location: {
			type: "Point",
			coordinates: [51.41817844947587, 0.010381344327546399],
		},
		picture1: image10,
	},

	{
		id: 12,
		title: "Office for sale in Merton",
		listing_type: "Voluntário",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Merton",
		internship_status: "Remoto",
		vacancies: 2,
		internship_bachelor: "Licenciatura",
		total_hours: 4,
		programming_lang_python: true,
		programming_lang_java: true,
		programming_lang_c_1: true,
		programming_lang_c_2: true,
		programming_lang_javascript: true,
		location: {
			type: "Point",
			coordinates: [51.417642743624164, -0.18389246063474793],
		},
		picture1: image14,
	},

	{
		id: 13,
		title: "House for sale in Havering",
		listing_type: "Curricular",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Havering",
		internship_status: "Remoto",
		vacancies: 1,
		internship_bachelor: "Licenciatura",
		total_hours: 4,
		programming_lang_python: false,
		programming_lang_java: true,
		programming_lang_c_1: true,
		programming_lang_c_2: true,
		programming_lang_javascript: true,
		location: {
			type: "Point",
			coordinates: [51.5523192864514, 0.25604463764059254],
		},
		picture1: image9,
	},

	{
		id: 14,
		title: "Apartment for rent in Wandsworth",
		listing_type: "Profissional",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Inner London",
		borough: "Wandsworth",
		internship_status: "Híbrido",
		vacancies: 2,
		internship_bachelor: "Licenciatura",
		total_hours: 4,
		programming_lang_python: true,
		programming_lang_java: true,
		programming_lang_c_1: true,
		programming_lang_c_2: true,
		programming_lang_javascript: true,
		location: {
			type: "Point",
			coordinates: [51.458244987751215, -0.18861599281323665],
		},
		picture1: image1,
	},

	{
		id: 15,
		title: "Office for rent in Redbridge",
		listing_type: "Voluntário",
		description:
			"Table content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
		division: "Outer London",
		borough: "Redbridge",
		internship_status: "Híbrido",
		vacancies: 3,
		internship_bachelor: "Licenciatura",
		total_hours: 4,
		programming_lang_python: true,
		programming_lang_java: true,
		programming_lang_c_1: true,
		programming_lang_c_2: true,
		programming_lang_javascript: true,
		location: {
			type: "Point",
			coordinates: [51.58701995760913, 0.05893467157444739],
		},
		picture1: image6,
	},
];

export default myListings;
