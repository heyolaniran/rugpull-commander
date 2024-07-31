
const OpenAI = require('openai'); 

const analyze = async (apiKey, contract) => {

    const openai = new OpenAI({apiKey: apiKey})

    const params = {
        model: 'gpt-3.5-turbo', 
        messages : [
            {
                roles: 'user', 
                content : `
                    Your role and goal is to be an AI smart Contract Auditor. Your job is to perform
                    an audit of the given smart contract?
                    
                    Here is the smart contract : ${contract}
                    
                    Please provide the results in the following array format for easy front-end display

                    [
                        {
                            'section':'Audit Report', 
                            'details': 'A detailed audit report of the smart contract, covering security, performance, rugpull and any other revelant aspects'  
                        }, 
                        {
                            'section' : 'Metrics', 
                            'details': [
                                {
                                    'metric': 'Security',
                                    'score': '0-10',  
                                },
                                {
                                    'metric': 'Performance',
                                    'score': '0-10',  
                                },
                                {
                                    'metric': 'RugPull Percent ',
                                    'score': '0-100',  
                                }, 
                                {
                                    'metric': 'other key areas', 
                                    'score': '0-10'
                                }, 
                                {
                                    'metric': 'Gas Efficiency',
                                    'score': '0-10',  
                                }, 
                                {
                                    'metric': 'Code Quality',
                                    'score': '0-10',  
                                }, 
                                {
                                    'metric': 'Documentation',
                                    'score': '0-10',  
                                }

                            ]
                        }, 
                        {
                            'section': 'Suggestions for Improvements', 
                            'details': 'Suggestions on how to improve the smart contract in term of security and any other identified weaknesses '
                        }
                    ]

                    Thanks you
                `
            }
        ]
    }


    const chatCompletion = await openai.chat.chatCompletion.create(params); 


    const auditResults = JSON.parse(chatCompletion.choices[0].message.content)

    console.log('Audit Reporting...')

    console.log(auditResults.find((result) => result.section === 'Audit Report').details)
}