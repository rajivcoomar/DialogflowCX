const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require('axios');
var https = require('https');
var fs = require('fs');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.get("/test", (request, response) => {
	
	var config = {
  method: 'get',
  url: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=700027&date=21-05-2021',
  headers: { 
   'Accept': 'application/json', 
    'Accept-Language': 'en_US', 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36', 
    'Host': 'cdn-api.co-vin.in'
  }
};

axios(config)
.then(function (responseExt) {
	 var data = JSON.parse(JSON.stringify(responseExt.data));
  console.log(JSON.stringify(responseExt.data));
  response.json(data);
})
.catch(function (error) {
  console.log(error);
  response.json(error);
});
	
});

app.post("/webhook", (request, response) => {
  let tag = request.body.fulfillmentInfo.tag;
  let jsonResponse = {};
 // console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  if (tag == "IndiaCovid") {
    //fulfillment response to be sent to the agent if the request tag is equal to "welcome tag"
	
//	var pinvalue = JSON.stringify(request.body.sessionInfo.parameters.number);
//	 console.log('pinvalue: ' + pinvalue);

		
		
		var config = {
		  method: 'get',
		  url: 'https://www.mohfw.gov.in/data/datanew.json',
		  headers: { }
		};

		axios(config)
		.then(function (responseExt) {
			
			var data = JSON.parse(JSON.stringify(responseExt.data));
			var active = data[36].active;
			var positive = data[36].positive;
			var cured = data[36].cured;
			var death = data[36].death;
			var new_active = data[36].new_active;
			var new_positive = data[36].new_positive;
			var new_cured = data[36].new_cured;
			var new_death = data[36].new_death;
			
			var plusActive = new_active - active;
			var pluspositive = new_positive - positive;
			var pluscured = new_cured - cured;
			var plusdeath = new_death - death;
		   console.log(plusdeath);
		   
		var today = new Date();
        
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
  
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = dd + '/' + mm + '/' + yyyy;
		   
		  
		  jsonResponse = {
			  //fulfillment text response to be sent to the agent if there are no defined responses for the specified tag
			  fulfillment_response: {
				messages: [
				{
						text: {
						  ////fulfillment text response to be sent to the agent
						  text: [
							'COVID-19 INDIA as on : '+today+', 08:00 IST (GMT+5:30) '
						  ]
						}
					},
				  
				  {
						payload: {
							richContent: [
							[
							  {
								type: "info",
								title: "Active Cases",
								subtitle: new_active + " ("+plusActive+")",
								image: {
								  src: {
									rawUrl: "https://image.flaticon.com/icons/png/128/3214/3214036.png"
								  }
								}
							  },
							  {
								type: "info",
								title: "Cured",
								subtitle: new_cured + " (+"+pluscured+")",
								image: {
								  src: {
									rawUrl: "https://image.flaticon.com/icons/png/128/3039/3039418.png"
								  }
								}
							  },
							  {
								type: "info",
								title: "Death",
								subtitle: new_death + " (+"+plusdeath+")",
								image: {
								  src: {
									rawUrl: "https://image.flaticon.com/icons/png/128/2833/2833342.png"
								  }
								}
							  },
							  {
								type: "chips",
								options: [
								  {
									text: "Covid Mythbusters",
									image: {
									  src: {
										rawUrl: "https://www.who.int/images/default-source/infographics/who-emblem.png?sfvrsn=877bb56a_2"
									  }
									}
								   
								  },
								  {
									text: "Vaccine Availability",
									image: {
									  src: {
										rawUrl: "https://prod-cdn.preprod.co-vin.in/assets/images/covid19logo.jpg"
									  }
									}
								  },
								  {
									text: "About Me",
									image: {
									  src: {
										rawUrl: "https://img.icons8.com/officel/2x/person-male.png"
									  }
									}
								  }
								]
							}
							]
						  ]
						}
					},
					{
						text: {
						  ////fulfillment text response to be sent to the agent
						  text: [
							`In few words, please tell me how I can assist you?`
						  ]
						}
					},
					
				  
				]
			  }
			};
			
			response.json(jsonResponse);
		  
		})
		.catch(function (error) {
		  console.log(error);
		});
		
		
	
    
  }
  else if (tag == "Mythbusters") {
	  
	  var number = Math.floor(Math.random() * 37 ) ; 
	  
	  var factArr = ['FACT: Hand sanitizers can be used often','FACT: Alcohol-based sanitizers are safe for everyone to use','FACT: Alcohol-based sanitizers can be used in religions where alcohol is prohibited','FACT: It is safer to frequently clean your hands and not wear gloves','FACT: Touching a communal bottle of alcohol-based sanitizer will not infect you','FACT: An alcohol-based handrub is listed as a WHO essential medicine','FACT: The amount of alcohol-based sanitizer you use matters','FACT: Clinical trials confirm that hydroxychloroquine does not prevent illness or death from COVID-19.','FACT: Vitamin and mineral supplements cannot cure COVID-19','FACT: Studies show hydroxychloroquine does not have clinical benefits in treating COVID-19','FACT :Is dexamethasone a treatment for all COVID-19 patients?','FACT: People should NOT wear masks while exercising','FACT: Water or swimming does not transmit the COVID-19 virus','FACT: The likelihood of shoes spreading COVID-19 is very low','FACT: The coronavirus disease (COVID-19) is caused by a virus, NOT by bacteria','FACT: The prolonged use of medical masks* when properly worn, DOES NOT cause CO2 intoxication nor oxygen deficiency','FACT: Most people who get COVID-19 recover from it','FACT: Drinking alcohol does not protect you against COVID-19 and can be dangerous','FACT: Thermal scanners CANNOT detect COVID-19','FACT: Adding pepper to your soup or other meals DOES NOT prevent or cure COVID-19','FACT: COVID-19 is NOT transmitted through houseflies','FACT: Spraying and introducing bleach or another disinfectant into your body WILL NOT protect you against COVID-19 and can be dangerous','FACT: Drinking methanol, ethanol or bleach DOES NOT prevent or cure COVID-19 and can be extremely dangerous','FACT: 5G mobile networks DO NOT spread COVID-19','FACT: Exposing yourself to the sun or temperatures higher than 25°C DOES NOT protect you from COVID-19','FACT: Catching COVID-19 DOES NOT mean you will have it for life','FACT: Being able to hold your breath for 10 seconds or more without coughing or feeling discomfort DOES NOT mean you are free from COVID-19','FACT: The COVID-19 virus can spread in hot and humid climates','FACT: Cold weather and snow CANNOT kill the COVID-19 virus','FACT: Taking a hot bath does not prevent COVID-19','The COVID-19 virus CANNOT be spread through mosquito bites','FACT: Hand dryers are NOT effective in killing the COVID-19 virus','FACT: Ultra-violet (UV) lamps should NOT be used to disinfect hands or other areas of your skin','FACT: Vaccines against pneumonia DO NOT protect against the COVID-19 virus','FACT: Rinsing your nose with saline does NOT prevent COVID-19','FACT: Eating garlic does NOT prevent COVID-19','FACT: People of all ages can be infected by the COVID-19 virus','FACT: Antibiotics CANNOT prevent or treat COVID-19'];
	  var descArr = ['An alcohol-based sanitizer does not create antibiotic resistance. Unlike other antiseptics and antibiotics, pathogens (harmful germs) do not seem to develop resistance to alcohol-based sanitizers.','	Alcohols in the sanitizers have not been shown to create any relevant health issues. Little alcohol is absorbed into the skin, and most products contain an emollient to reduce skin dryness. Allergic contact dermatitis and bleaching of hand hair due to alcohol are very rare adverse effects. Accidental swallowing and intoxication have been described in rare cases.','	Any manufactured substance developed to alleviate illness or contribute to better health is permitted by the Quran, including alcohol used as a medical agent. ','	Wearing gloves risks transferring germs from one surface to another and contaminating your hands when removing them. Wearing gloves does not replace cleaning hands. Health workers wear gloves only for specific tasks.','	Once you have sanitized your hands, you have disinfected them from any germs that may have been on the bottle. If everyone uses sanitizer in a public place such as a supermarket entrance, the risk of germs on communal items will be lower and will help keep everyone safe.','	Clean hands protect patients, health workers, other caregivers and everyone from infection. Cleaning your hands is one of the key measures to prevent disease. ','	Apply a palmful of alcohol-based sanitizer to cover all surfaces of your hands. Rub your hands together using the right technique until they are dry.The entire procedure should last 20-30 seconds.','	Hydroxychloroquine or chloroquine, a common treatment for malaria and certain autoimmune diseases, has been studied as a preventative treatment for COVID-19. Evidence from these studies shows that hydroxychloroquine has little to no impact on illness, hospitalization, or death. ','	Micronutrients, such as vitamins D and C and zinc, are critical for a well-functioning immune system and play a vital role in promoting health and nutritional well-being.  There is currently no guidance on the use of micronutrient supplements as a treatment of COVID-19. WHO is coordinating efforts to develop and evaluate medicines to treat COVID-19.','	Hydroxychloroquine or chloroquine, a treatment for malaria, lupus erythematosus, and rheumatoid arthritis, has been under study as a possible treatment for COVID-19. Current data shows that this drug does not reduce deaths among hospitalised COVID-19 patients, nor help people with moderate disease. The use of hydoxychloroquine and chloroquine is accepted as generally safe for patients with malaria and autoimmune diseases, but its use where not indicated and without medical supervision can cause serious side effects and should be avoided. More decisive research is needed to assess its value in patients with mild disease or as pre- or post-exposure prophylaxis in patients exposed to COVID-19.','	Dexamethasone should be reserved for patients who need it most. It should not be stockpiled. It provided no improvement for patients with mild symptoms. Dexamethasone is a corticosteroid used for its anti-inflammatory and immunosuppressive effects. For some COVID-19 patients on ventilators, a daily 6 mg dose of dexamethasone for 10 days improved their health','	People should NOT wear masks when exercising, as masks may reduce the ability to breathe comfortably. Sweat can make the mask become wet more quickly which makes it difficult to breathe and promotes the growth of microorganisms. The important preventive measure during exercise is to maintain physical distance of at least one meter from others.','	The COVID-19 virus does not transmit through water while swimming. However, the virus spreads between people when someone has close contact with an infected person.  WHAT YOU CAN DO: Avoid crowds and maintain at least a 1-metre distance from others, even when you are swimming or at swimming areas. Wear a mask when you’re not in the water and you can’t stay distant. Clean your hands frequently, cover a cough or sneeze with a tissue or bent elbow, and stay home if you’re unwell.','	The likelihood of COVID-19 being spread on shoes and infecting individuals is very low. As a precautionary measure, particularly in homes where infants and small children crawl or play on floors, consider leaving your shoes at the entrance of your home. This will help prevent contact with dirt or any waste  that could be carried on the soles of shoes.','	The virus that causes COVID-19 is in a family of viruses called Coronaviridae. Antibiotics do not work against viruses. Some people who become ill with COVID-19 can also develop a bacterial infection as a complication. In this case, antibiotics may be recommended by a health care provider. There is currently no licensed medication to cure COVID-19. If you have symptoms, call your health care provider or COVID-19 hotline for assistance.','	The prolonged use of medical masks can be uncomfortable. However, it does not lead to CO2 intoxication nor oxygen deficiency. While wearing a medical mask, make sure it fits properly and that it is tight enough to allow you to breathe normally. Do not re-use a disposable mask and always change it as soon as it gets damp.  Medical masks (also known as surgical masks) are flat or pleated; they are affixed to the head with straps or have ear loops.','	Most people who get COVID-19 have mild or moderate symptoms and can recover thanks to supportive care. If you have a cough, fever and difficulty breathing seek medical care early - call your health facility by telephone first. If you have fever and live in an area with malaria or dengue seek medical care immediately.','	The harmful use of alcohol increases your risk of health problems.','	Thermal scanners are effective in detecting people who have a fever (i.e. have a higher than normal body temperature). They cannot detect people who are infected with COVID-19. There are many causes of fever. Call your healthcare provider if you need assistance or seek immediate medical care if you have fever and live in an area with malaria or dengue.','	Hot peppers in your food, though very tasty, cannot prevent or cure COVID-19. The best way to protect yourself against the new coronavirus is to keep at least 1 metre away from others and to wash your hands frequently and thoroughly. It is also beneficial for your general health to maintain a balanced diet, stay well hydrated, exercise regularly and sleep well.','	To date, there is no evidence or information to suggest that the COVID-19 virus transmitted through houseflies. The virus that cause COVID-19 spreads primarily through droplets generated when an infected person coughs, sneezes or speaks. You can also become infected by touching a contaminated surface and then touching your eyes, nose or mouth before washing your hands. To protect yourself, keep at least 1-metre distance from others and disinfect frequently-touched surfaces. Clean your hands thoroughly and often and avoid touching your eyes, mouth and nose.','	Do not under any circumstance spray or introduce bleach or any other disinfectant into your body. These substances can be poisonous if ingested and cause irritation and damage to your skin and eyes. Bleach and disinfectant should be used carefully to disinfect surfaces only. Remember to keep chlorine (bleach) and other disinfectants out of reach of children','	Methanol, ethanol, and bleach are poisons. Drinking them can lead to disability and death. Methanol, ethanol, and bleach are sometimes used in cleaning products to kill the virus on surfaces – however you should never drink them. They will not kill the virus in your body and they will harm your internal organs. To protect yourself against COVID-19, disinfect objects and surfaces, especially the ones you touch regularly. You can use diluted bleach or alcohol for that. Make sure you clean your hands frequently and thoroughly and avoid touching your eyes, mouth and nose.','	Viruses cannot travel on radio waves/mobile networks. COVID-19 is spreading in many countries that do not have 5G mobile networks. COVID-19 is spread through respiratory droplets when an infected person coughs, sneezes or speaks. People can also be infected by touching a contaminated surface and then their eyes, mouth or nose.','	You can catch COVID-19, no matter how sunny or hot the weather is. Countries with hot weather have reported cases of COVID-19. To protect yourself, make sure you clean your hands frequently and thoroughly and avoid touching your eyes, mouth, and nose.  ','	You can catch COVID-19, no matter how sunny or hot the weather is. Countries with hot weather have reported cases of COVID-19. To protect yourself, make sure you clean your hands frequently and thoroughly and avoid touching your eyes, mouth, and nose.  ','	The most common symptoms of COVID-19 are dry cough, tiredness and fever. Some people may develop more severe forms of the disease, such as pneumonia. The best way to confirm if you have  the virus producing COVID-19 disease is with a laboratory test.  You cannot confirm it with this breathing exercise, which can even be dangerous.','	The best way to protect yourself against COVID-19 is by maintaining physical distance of at least 1 metre from others and frequently cleaning your hands. By doing this you eliminate viruses that may be on your hands and avoid infection that could occur by then touching your eyes, mouth, and nose.','	There is no reason to believe that cold weather can kill the new coronavirus or other diseases. The normal human body temperature remains around 36.5°C to 37°C, regardless of the external temperature or weather. The most effective way to protect yourself against the new coronavirus is by frequently cleaning your hands with alcohol-based hand rub or washing them with soap and water.','	Taking a hot bath will not prevent you from catching COVID-19. Your normal body temperature remains around 36.5°C to 37°C, regardless of the temperature of your bath or shower. Actually, taking a hot bath with extremely hot water can be harmful, as it can burn you. The best way to protect yourself against COVID-19 is by frequently cleaning your hands. By doing this you eliminate viruses that may be on your hands and avoid infection that could occur by then touching your eyes, mouth, and nose.','	To date there has been no information nor evidence to suggest that the new coronavirus could be transmitted by mosquitoes. The new coronavirus is a respiratory virus which spreads primarily through droplets generated when an infected person coughs or sneezes, or through droplets of saliva or discharge from the nose. To protect yourself, clean your hands frequently with an alcohol-based hand rub or wash them with soap and water. Also, avoid close contact with anyone who is coughing and sneezing','	Hand dryers are not effective in killing the COVID-19 virus. To protect yourself, frequently clean your hands with an alcohol-based hand rub or wash them with soap and water. Once your hands are cleaned, you should dry them thoroughly by using paper towels or a warm air dryer.','	UV radiation can cause skin irritation and damage your eyes. Cleaning your hands with alcohol-based hand rub or washing your hands with soap and water are the most effective ways to remove the virus.','	Vaccines against pneumonia, such as pneumococcal vaccine and Haemophilus influenza type B (Hib) vaccine, do not provide protection against the new coronavirus. The virus is so new and different that it needs its own vaccine. Researchers are trying to develop a vaccine against COVID-19, and WHO is supporting their efforts. Although these vaccines are not effective against COVID-19, vaccination against respiratory illnesses is highly recommended to protect your health.','	There is no evidence that regularly rinsing the nose with saline has protected people from infection with the new coronavirus. There is some limited evidence that regularly rinsing the nose with saline can help people recover more quickly from the common cold. However, regularly rinsing the nose has not been shown to prevent respiratory infections.','	Garlic is a healthy food that may have some antimicrobial properties. However, there is no evidence from the current outbreak that eating garlic has protected people from the new coronavirus.','	Older people and younger people can be infected by the COVID-19 virus. Older people, and people with pre-existing medical conditions such as asthma, diabetes, and heart disease appear to be more vulnerable to becoming severely ill with the virus. WHO advises people of all ages to take steps to protect themselves from the virus, for example by following good hand hygiene and good respiratory hygiene. ','	Antibiotics work only against bacteria, not viruses. COVID-19 is caused by a virus, and therefore antibiotics should not be used for prevention or treatment. However, if you are hospitalized for COVID-19, you may receive antibiotics because bacterial co-infection is possible.'];
	  var imageArr= ['https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/myth_busters_hand_washing_4_5_4.tmb-768v.jpg?sfvrsn=a8aaa062_1','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/myth_busters_hand_washing_4_5_2.tmb-768v.jpg?sfvrsn=fb2e8292_1','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/myth_busters_hand_washing_4_5_3.tmb-1920v.jpg?sfvrsn=5e266a3f_1','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/myth_busters_hand_washing_4_5_6.tmb-1920v.jpg?sfvrsn=f60a78e1_1','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/myth_busters_hand_washing_4_5_5.tmb-1920v.jpg?sfvrsn=4fdfb8fe_1','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/myth_busters_hand_washing_4_5_1.tmb-1920v.jpg?sfvrsn=ed64012e_1','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/myth_busters_hand_washing_4_5_7.tmb-1920v.jpg?sfvrsn=1455bf22_1','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/who_hydroxychloraquine_hd.tmb-1920v.jpg?sfvrsn=b95d14db_1','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/eng-mythbusters-covid19-(5)-supplements.tmb-1920v.png?sfvrsn=10c11fe4_1','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/hydroxychloroquine-revised-final.tmb-1920v.jpeg?sfvrsn=95e75be5_1','	https://www.who.int/images/default-source/health-topics/coronavirus/corticosteroids-revised-final8263b3f3ae524a34a00b0e9ee68c3ed6.tmb-1920v.jpeg?sfvrsn=2231f911_1','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/mythbuster---masks-and-exercise.tmb-1920v.png?sfvrsn=2d51cd94_2','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/swimming.tmb-1920v.jpeg?sfvrsn=79a05b52_1','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/mythbusters---shoes.tmb-1920v.png?sfvrsn=cc08f8dd_1','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/mythbuster-bacteria-vs-virus.tmb-1920v.png?sfvrsn=ff438da4_1','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/mythbuster-masks.tmb-1920v.png?sfvrsn=7324738d_1','	https://www.who.int/images/default-source/health-topics/coronavirus/eng-mythbusting-ncov-(80).tmb-1920v.png?sfvrsn=afa995ff_1','	https://www.who.int/images/default-source/health-topics/coronavirus/eng-mythbusting-ncov-(79).tmb-1920v.png?sfvrsn=86f79761_1','	https://www.who.int/images/default-source/health-topics/coronavirus/eng-mythbusting-ncov-(75).tmb-1920v.png?sfvrsn=a1aa01b1_1','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/7.tmb-768v.png?sfvrsn=1aab7c90_2','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/24.tmb-768v.png?sfvrsn=eeb1f366_2','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/28.tmb-479v.png?sfvrsn=a0bb5119_2','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/26-revised.tmb-768v.png?sfvrsn=7d5199ac_1','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/eng-mythbusting-ncov-(15).tmb-479v.png?sfvrsn=a8b9e94_2','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/mb-sun-exposure.tmb-768v.png?sfvrsn=658ce588_6','	https://www.who.int/images/default-source/infographics/who-emblem.png?sfvrsn=877bb56a_2','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/mb-breathing-exercice.tmb-768v.jpg?sfvrsn=db06f4a9_5','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/52.tmb-768v.png?sfvrsn=862374e_6','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/mb-cold-snow.tmb-479v.png?sfvrsn=1e557ba_5','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/mb-hot-bath.tmb-768v.png?sfvrsn=f1ebbc_5','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/mb-mosquito-bite.tmb-479v.png?sfvrsn=a1d90f6_5','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/mythbusters-27.tmb-768v.png?sfvrsn=d17bc6bb_9','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/mb---uv-light-edited.tmb-479v.png?sfvrsn=14c7467d_7','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/11.tmb-768v.png?sfvrsn=97f2a51e_10','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/23.tmb-768v.png?sfvrsn=c65dad38_15','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/19.tmb-479v.png?sfvrsn=52adfc93_15','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/mythbuster-2.tmb-768v.png?sfvrsn=635d24e5_15','	https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/mythbuster-3.tmb-479v.png?sfvrsn=10657e42_15'];
	  
	  
	  jsonResponse = {
			  //fulfillment text response to be sent to the agent if there are no defined responses for the specified tag
			  fulfillment_response: {
				messages: [
				{
						text: {
						  ////fulfillment text response to be sent to the agent
						  text: [
							`Did you know:`
						  ]
						}
					},
				  
				  {
						payload: {
							richContent: [
							[
							  {
								type: "accordion",
								title: factArr[number],
								
								image: {
								  src: {
									rawUrl: "https://www.who.int/images/default-source/health-topics/coronavirus/myth-busters/web-mythbusters/myth_busters_hand_washing_4_5_4.tmb-479v.jpg?sfvrsn=a8aaa062_1"
								  }
								},
								text: descArr[number]
							  },
							  {
								type: "image",
								rawUrl: imageArr[number],
								accessibilityText: "Example logo"
							  },
							  
							  {
								type: "chips",
								options: [
								  {
									text: "Another Covid Mythbusters",
									image: {
									  src: {
										rawUrl: "https://www.who.int/images/default-source/infographics/who-emblem.png?sfvrsn=877bb56a_2"
									  }
									}
								   
								  },
								  
								  {
									text: "Vaccine Availability",
									image: {
									  src: {
										rawUrl: "https://prod-cdn.preprod.co-vin.in/assets/images/covid19logo.jpg"
									  }
									}
								  },
								  {
									text: "India Covid Status",
									image: {
									  src: {
										rawUrl: "https://www.mohfw.gov.in/assets/images/emblem.png"
									  }
									}
								  },
								  {
									text: "About Me",
									image: {
									  src: {
										rawUrl: "https://img.icons8.com/officel/2x/person-male.png"
									  }
									}
								  }
								]
							}
							]
						  ]
						}
					},
					{
						text: {
						  ////fulfillment text response to be sent to the agent
						  text: [
							`What you would like to do next?`
						  ]
						}
					},
					
				  
				]
			  }
			};
	  
	  response.json(jsonResponse);
	  
  }
  
  else if(tag == "validatePincode"){
	  
	 var pincode = JSON.stringify(request.body.sessionInfo.parameters.pincode);
	 var countVar =0;
	 if(request.body.sessionInfo.parameters.count != null)
	 {
		 countVar = request.body.sessionInfo.parameters.count;
	 }
	 
	var promptValue = "";
	if(pincode.length == 6)
	{
		jsonResponse = {
		  fulfillment_response: {
			messages: [
			  {
				text: {
				  //fulfillment text response to be sent to the agent
				  text: ["Are you looking for Free, Paid or Both option?"]
				}
			  }
			]
		  },
		  sessionInfo:{
			session:JSON.stringify(request.body.sessionInfo.session),
				  parameters:{
					 pagePinflow : "valid"
				  }
			}	
		};
	}
	else
	{
		countVar = countVar + 1;
		console.log(countVar);
		if(countVar == 3)
		{
			jsonResponse = {
			  fulfillment_response: {
				messages: [
				  {
					text: {
					  //fulfillment text response to be sent to the agent
					  text: ["You have reached Max retry. Lets start from begining."]
					}
				  },
				  {
					text: {
					  //fulfillment text response to be sent to the agent
					  text: ["How I can assist you?"]
					}
				  },
				  {
					  
						payload: {
							richContent: [
							[
							  
							  
							  {
								type: "chips",
								options: [
								  {
									text: "Another Covid Mythbusters",
									image: {
									  src: {
										rawUrl: "https://www.who.int/images/default-source/infographics/who-emblem.png?sfvrsn=877bb56a_2"
									  }
									}
								   
								  },
								  
								  {
									text: "Vaccine Availability",
									image: {
									  src: {
										rawUrl: "https://prod-cdn.preprod.co-vin.in/assets/images/covid19logo.jpg"
									  }
									}
								  },
								  {
									text: "India Covid Status",
									image: {
									  src: {
										rawUrl: "https://www.mohfw.gov.in/assets/images/emblem.png"
									  }
									}
								  },
								  {
									text: "About Me",
									image: {
									  src: {
										rawUrl: "https://img.icons8.com/officel/2x/person-male.png"
									  }
									}
								  }
								]
							}
							]
						  ]
						}
					}
				]
			  },
			  sessionInfo:{
				session:JSON.stringify(request.body.sessionInfo.session),
					  parameters:{
						 pagePinflow: "maxtry"
					  }
				}	
			};
			
		}
		else
		{
			jsonResponse = {
			  fulfillment_response: {
				messages: [
				  {
					text: {
					  //fulfillment text response to be sent to the agent
					  text: ["Sorry, I didn't get that."]
					}
				  }
				]
			  },
			  sessionInfo:{
				session:JSON.stringify(request.body.sessionInfo.session),
					  parameters:{
						 count:countVar, pagePinflow: "invalid"
					  }
				}	
			};
			
			
		}
		
	}
	  
 
	response.json(jsonResponse);
  }
  
  else if(tag == "FreeCowin")
  {
	  var today = new Date();
        
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
  
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = dd +"-"+mm+"-"+yyyy;
	  
	   var pincode = JSON.stringify(request.body.sessionInfo.parameters.pincode);
	  
		 var data = JSON.stringify({
		  "pincode": pincode,
		  "date": today
		});
	  
		var config = {
			  method: 'post',
			  url: 'http://35.200.182.255:8080/getOutput',
			  headers: { 
				'Content-Type': 'application/json'
			  },
			  data : data
			};

			axios(config)
			.then(function (responseExt) {
			  //console.log(JSON.stringify(response.data));
			  
			   var data = JSON.parse(JSON.stringify(responseExt.data));
			   console.log(data.sessions.length);
			   
			   if(data.sessions.length == 0)
			   {
				   jsonResponse = {
						  fulfillment_response: {
							messages: [
							  {
								text: {
								  //fulfillment text response to be sent to the agent
								  text: ["Sorry no Vaccine available for Pincode : "+pincode]
								}
							  },
							  {
								text: {
								  //fulfillment text response to be sent to the agent
								  text: ["Do you want to try again?"]
								}
							  },
							  {
								  
									payload: {
										richContent: [
										[
										  
										  
										  {
											type: "chips",
											options: [
											  {
												text: "Another Pincode",
												image: {
												  src: {
													rawUrl: "https://img.icons8.com/ios/452/zip-code.png"
												  }
												}
											   
											  },
											
											  {
												text: "Covid Mythbusters",
												image: {
												  src: {
													rawUrl: "https://www.who.int/images/default-source/infographics/who-emblem.png?sfvrsn=877bb56a_2"
												  }
												}
											   
											  },
											  
											  {
												text: "Vaccine Availability",
												image: {
												  src: {
													rawUrl: "https://prod-cdn.preprod.co-vin.in/assets/images/covid19logo.jpg"
												  }
												}
											  },
											  {
												text: "India Covid Status",
												image: {
												  src: {
													rawUrl: "https://www.mohfw.gov.in/assets/images/emblem.png"
												  }
												}
											  },
											  {
												text: "About Me",
												image: {
												  src: {
													rawUrl: "https://img.icons8.com/officel/2x/person-male.png"
												  }
												}
											  }
											]
										}
										]
									  ]
									}
								}
							]
						  }	
						};
						response.json(jsonResponse);
			   }
			   else
			   {
			   
					    var o = {};
						var fulfillment_response = 'fulfillment_response';
						var messages = 'messages';
						var payload = 'payload';
						var richContent = 'richContent';

						o[fulfillment_response] = {}; 
						o[fulfillment_response][messages] = [];  


						  
						var dataText = {
									text: {
									  text: [
										'As on '+today+', the Vaccine availability for pincode -'+pincode 
									  ]
									}
								};
						o[fulfillment_response][messages].push(dataText);

						var op = {};
						op[payload] = {};
						op[payload][richContent] = [];

						var arr = [];
								  
								  
					 
					  
															
					   
					   for(var i=0; i< data.sessions.length ;i++)
					   {
						   if(data.sessions[i].fee_type == "Free")
						   {
							 
							   
							   var data_tmp = {
									type: "info",
									title: data.sessions[i].name + ", Available - "+ data.sessions[i].available_capacity,
									subtitle: "Address - "+data.sessions[i].address,
									image: {
											  src: {
												rawUrl: "https://cdn.icon-icons.com/icons2/1465/PNG/512/588hospital_100778.png"
											  }
											},
									actionLink: "https://www.cowin.gov.in/home"
								};
								arr.push(data_tmp);
						   }
						   
					   }
					   
					   
					   var chips = {
									type: "chips",
									options: [
									  {
										text: "Covid Mythbusters",
										image: {
										  src: {
											rawUrl: "https://www.who.int/images/default-source/infographics/who-emblem.png?sfvrsn=877bb56a_2"
										  }
										}
									   
									  },
									  
									  {
										text: "Vaccine Availability",
										image: {
										  src: {
											rawUrl: "https://prod-cdn.preprod.co-vin.in/assets/images/covid19logo.jpg"
										  }
										}
									  },
									  {
										text: "India Covid Status",
										image: {
										  src: {
											rawUrl: "https://www.mohfw.gov.in/assets/images/emblem.png"
										  }
										}
									  },
									  {
										text: "About Me",
										image: {
										  src: {
											rawUrl: "https://img.icons8.com/officel/2x/person-male.png"
										  }
										}
									  }
									]
								};
												
					   arr.push(chips);
					   op[payload][richContent].push(arr);
					   o[fulfillment_response][messages].push(op);
					   
					   
					   
			   }
			   
			   	response.json(o);
			  
			})
			.catch(function (error) {
			  console.log(error);
			});
	  
  }
  else if(tag == "PaidCowin")
  {
	  var today = new Date();
        
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
  
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = dd +"-"+mm+"-"+yyyy;
	  
	   var pincode = JSON.stringify(request.body.sessionInfo.parameters.pincode);
	  
		var data = JSON.stringify({
		  "pincode": pincode,
		  "date": today
		});
	  
		var config = {
			  method: 'post',
			  url: 'http://35.200.182.255:8080/getOutput',
			  headers: { 
				'Content-Type': 'application/json'
			  },
			  data : data
			};

			axios(config)
			.then(function (responseExt) {
			  //console.log(JSON.stringify(response.data));
			  
			   var data = JSON.parse(JSON.stringify(responseExt.data));
			   console.log(data.sessions.length);
			   
			   if(data.sessions.length == 0)
			   {
				   jsonResponse = {
						  fulfillment_response: {
							messages: [
							  {
								text: {
								  //fulfillment text response to be sent to the agent
								  text: ["Sorry no Vaccine available for Pincode : "+pincode]
								}
							  },
							  {
								text: {
								  //fulfillment text response to be sent to the agent
								  text: ["Do you want to try again?"]
								}
							  },
							  {
								  
									payload: {
										richContent: [
										[
										  
										  
										  {
											type: "chips",
											options: [
											  {
												text: "Another Pincode",
												image: {
												  src: {
													rawUrl: "https://img.icons8.com/ios/452/zip-code.png"
												  }
												}
											   
											  }
											  ,
											
											  {
												text: "Covid Mythbusters",
												image: {
												  src: {
													rawUrl: "https://www.who.int/images/default-source/infographics/who-emblem.png?sfvrsn=877bb56a_2"
												  }
												}
											   
											  },
											  
											  {
												text: "Vaccine Availability",
												image: {
												  src: {
													rawUrl: "https://prod-cdn.preprod.co-vin.in/assets/images/covid19logo.jpg"
												  }
												}
											  },
											  {
												text: "India Covid Status",
												image: {
												  src: {
													rawUrl: "https://www.mohfw.gov.in/assets/images/emblem.png"
												  }
												}
											  },
											  {
												text: "About Me",
												image: {
												  src: {
													rawUrl: "https://img.icons8.com/officel/2x/person-male.png"
												  }
												}
											  }
											]
										}
										]
									  ]
									}
								}
							]
						  }	
						};
						response.json(jsonResponse);
			   }
			   else
			   {
			   
					    var o = {};
						var fulfillment_response = 'fulfillment_response';
						var messages = 'messages';
						var payload = 'payload';
						var richContent = 'richContent';

						o[fulfillment_response] = {}; 
						o[fulfillment_response][messages] = [];  


						  
						var dataText = {
									text: {
									  text: [
										'As on '+today+', the Vaccine availability for pincode -'+pincode 
									  ]
									}
								};
						o[fulfillment_response][messages].push(dataText);

						var op = {};
						op[payload] = {};
						op[payload][richContent] = [];

						var arr = [];
								  
								  
					 
					  
															
					   
					   for(var i=0; i< data.sessions.length ;i++)
					   {
						   if(data.sessions[i].fee_type == "Paid")
						   {
							 
							   
							   var data_tmp = {
									type: "info",
									title: data.sessions[i].name + ", Available - "+ data.sessions[i].available_capacity,
									subtitle: "Address - "+data.sessions[i].address,
									image: {
											  src: {
												rawUrl: "https://cdn.icon-icons.com/icons2/1465/PNG/512/588hospital_100778.png"
											  }
											},
									actionLink: "https://www.cowin.gov.in/home"
								};
								arr.push(data_tmp);
						   }
						   
					   }
					   
					   
					   var chips = {
									type: "chips",
									options: [
									  {
										text: "Covid Mythbusters",
										image: {
										  src: {
											rawUrl: "https://www.who.int/images/default-source/infographics/who-emblem.png?sfvrsn=877bb56a_2"
										  }
										}
									   
									  },
									  
									  {
										text: "Vaccine Availability",
										image: {
										  src: {
											rawUrl: "https://prod-cdn.preprod.co-vin.in/assets/images/covid19logo.jpg"
										  }
										}
									  },
									  {
										text: "India Covid Status",
										image: {
										  src: {
											rawUrl: "https://www.mohfw.gov.in/assets/images/emblem.png"
										  }
										}
									  },
									  {
										text: "About Me",
										image: {
										  src: {
											rawUrl: "https://img.icons8.com/officel/2x/person-male.png"
										  }
										}
									  }
									]
								};
												
					   arr.push(chips);
					   op[payload][richContent].push(arr);
					   o[fulfillment_response][messages].push(op);
					   
					   
					   
			   }
			   
			   	response.json(o);
			  
			})
			.catch(function (error) {
			  console.log(error);
			});
	  
  }
   else if(tag == "BothCowin")
  {
	  var today = new Date();
        
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
  
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = dd +"-"+mm+"-"+yyyy;
	  
	   var pincode = JSON.stringify(request.body.sessionInfo.parameters.pincode);
	  
		var data = JSON.stringify({
		  "pincode": pincode,
		  "date": today
		});
	  
		var config = {
			  method: 'post',
			  url: 'http://35.200.182.255:8080/getOutput',
			  headers: { 
				'Content-Type': 'application/json'
			  },
			  data : data
			};

			axios(config)
			.then(function (responseExt) {
			  //console.log(JSON.stringify(response.data));
			  
			   var data = JSON.parse(JSON.stringify(responseExt.data));
			   console.log(data.sessions.length);
			   
			   if(data.sessions.length == 0)
			   {
				   jsonResponse = {
						  fulfillment_response: {
							messages: [
							  {
								text: {
								  //fulfillment text response to be sent to the agent
								  text: ["Sorry no Vaccine available for Pincode : "+pincode]
								}
							  },
							  {
								text: {
								  //fulfillment text response to be sent to the agent
								  text: ["Do you want to try again?"]
								}
							  },
							  {
								  
									payload: {
										richContent: [
										[
										  
										  
										  {
											type: "chips",
											options: [
											  {
												text: "Another Pincode",
												image: {
												  src: {
													rawUrl: "https://img.icons8.com/ios/452/zip-code.png"
												  }
												}
											   
											  }
											  ,
											
											  {
												text: "Covid Mythbusters",
												image: {
												  src: {
													rawUrl: "https://www.who.int/images/default-source/infographics/who-emblem.png?sfvrsn=877bb56a_2"
												  }
												}
											   
											  },
											  
											  {
												text: "Vaccine Availability",
												image: {
												  src: {
													rawUrl: "https://prod-cdn.preprod.co-vin.in/assets/images/covid19logo.jpg"
												  }
												}
											  },
											  {
												text: "India Covid Status",
												image: {
												  src: {
													rawUrl: "https://www.mohfw.gov.in/assets/images/emblem.png"
												  }
												}
											  },
											  {
												text: "About Me",
												image: {
												  src: {
													rawUrl: "https://img.icons8.com/officel/2x/person-male.png"
												  }
												}
											  }
											]
										}
										]
									  ]
									}
								}
							]
						  }	
						};
						response.json(jsonResponse);
			   }
			   else
			   {
			   
					    var o = {};
						var fulfillment_response = 'fulfillment_response';
						var messages = 'messages';
						var payload = 'payload';
						var richContent = 'richContent';

						o[fulfillment_response] = {}; 
						o[fulfillment_response][messages] = [];  


						  
						var dataText = {
									text: {
									  text: [
										'As on '+today+', the Vaccine availability for pincode -'+pincode 
									  ]
									}
								};
						o[fulfillment_response][messages].push(dataText);

						var op = {};
						op[payload] = {};
						op[payload][richContent] = [];

						var arr = [];
								  
								  
					 
					  
															
					   
					   for(var i=0; i< data.sessions.length ;i++)
					   {
						   
							 
							   
							   var data_tmp = {
									type: "info",
									title: data.sessions[i].name + ", Available - "+ data.sessions[i].available_capacity,
									subtitle: "Address - "+data.sessions[i].address,
									image: {
											  src: {
												rawUrl: "https://cdn.icon-icons.com/icons2/1465/PNG/512/588hospital_100778.png"
											  }
											},
									actionLink: "https://www.cowin.gov.in/home"
								};
								arr.push(data_tmp);
						   
						   
					   }
					   
					   
					   var chips = {
									type: "chips",
									options: [
									  {
										text: "Covid Mythbusters",
										image: {
										  src: {
											rawUrl: "https://www.who.int/images/default-source/infographics/who-emblem.png?sfvrsn=877bb56a_2"
										  }
										}
									   
									  },
									  
									  {
										text: "Vaccine Availability",
										image: {
										  src: {
											rawUrl: "https://prod-cdn.preprod.co-vin.in/assets/images/covid19logo.jpg"
										  }
										}
									  },
									  {
										text: "India Covid Status",
										image: {
										  src: {
											rawUrl: "https://www.mohfw.gov.in/assets/images/emblem.png"
										  }
										}
									  },
									  {
										text: "About Me",
										image: {
										  src: {
											rawUrl: "https://img.icons8.com/officel/2x/person-male.png"
										  }
										}
									  }
									]
								};
												
					   arr.push(chips);
					   op[payload][richContent].push(arr);
					   o[fulfillment_response][messages].push(op);
					   
					   
					   
			   }
			   
			   	response.json(o);
			  
			})
			.catch(function (error) {
			  console.log(error);
			});
	  
  }
  


  else {
    jsonResponse = {
      //fulfillment text response to be sent to the agent if there are no defined responses for the specified tag
      fulfillment_response: {
        messages: [
          {
            text: {
              ////fulfillment text response to be sent to the agent
              text: [
                `There are no fulfillment responses defined for "${tag}"" tag`
              ]
            }
          }
        ]
      }
    };
	response.json(jsonResponse);
  }
  
});
var port = process.env.PORT || 8080; 
const listener = app.listen(port, () => {
 console.log("Your app is listening on port " + listener.address().port);
});
//https.createServer(options, app).listen(443);