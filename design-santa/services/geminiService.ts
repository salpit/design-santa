{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue255;\red255\green255\blue254;\red0\green0\blue0;
\red14\green110\blue109;\red144\green1\blue18;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c100000;\cssrgb\c100000\c100000\c99608;\cssrgb\c0\c0\c0;
\cssrgb\c0\c50196\c50196;\cssrgb\c63922\c8235\c8235;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 import\cf0 \strokec4  \{ \cf5 \strokec5 GoogleGenAI\cf0 \strokec4  \} \cf2 \strokec2 from\cf0 \strokec4  \cf6 \strokec6 "@google/genai"\cf0 \strokec4 ;\cb1 \
\
\cf2 \cb3 \strokec2 const\cf0 \strokec4  \cf5 \strokec5 GEMINI_API_KEY\cf0 \strokec4  = process.env.\cf5 \strokec5 API_KEY\cf0 \strokec4  || \cf6 \strokec6 ''\cf0 \strokec4 ;\cb1 \
\
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  generateMissionBrief = \cf2 \strokec2 async\cf0 \strokec4  (receiverName: \cf2 \strokec2 string\cf0 \strokec4 ): \cf5 \strokec5 Promise\cf0 \strokec4 <\cf2 \strokec2 string\cf0 \strokec4 > => \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 if\cf0 \strokec4  (!\cf5 \strokec5 GEMINI_API_KEY\cf0 \strokec4 ) \{\cb1 \
\cb3     \cf2 \strokec2 return\cf0 \strokec4  \cf6 \strokec6 `Obiettivo: \cf0 \strokec4 $\{receiverName\}\cf6 \strokec6 . Il modulo AI \'e8 offline. Improvvisa un regalo con creativit\'e0 analogica.`\cf0 \strokec4 ;\cb1 \
\cb3   \}\cb1 \
\
\cb3   \cf2 \strokec2 try\cf0 \strokec4  \{\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  ai = \cf2 \strokec2 new\cf0 \strokec4  \cf5 \strokec5 GoogleGenAI\cf0 \strokec4 (\{ apiKey: \cf5 \strokec5 GEMINI_API_KEY\cf0 \strokec4  \});\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  model = \cf6 \strokec6 "gemini-2.5-flash"\cf0 \strokec4 ;\cb1 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  prompt = \cf6 \strokec6 `\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6       Sei un sistema di gestione protocolli tecnico per un gruppo di Designer.\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6       Il tuo compito \'e8 assegnare un obiettivo per il Secret Santa (chiamato in codice "Protocollo X-MAS").\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6       \cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6       Il destinatario (Target) \'e8: \cf0 \strokec4 $\{receiverName\}\cf6 \strokec6 .\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6       \cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6       Genera un "Mission Brief" in ITALIANO (max 3-4 frasi).\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6       \cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6       CRITICO: \cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6       - L'ironia deve essere LEGGERA, DIVERTENTE e MAI offensiva. \cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6       - Rispetta sempre la sensibilit\'e0 del singolo. Evita sarcasmo pungente.\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6       \cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6       Tono di voce:\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6       - Tecnico, analitico, "nerd" del design.\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6       - Gioca in modo simpatico sulle passioni comuni dei designer (Pantone, griglie, font, cancelleria, ispirazione).\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6       - Non usare la parola "Regalo". Usa termini come "Asset Tangibile", "Artefatto", "Upgrade Analogico", "Deploy Festivo".\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6       \cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6       Esempio sicuro e divertente:\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6       "Il sistema rileva la necessit\'e0 di un upgrade estetico sulla scrivania del Target. Si consiglia l'acquisizione di un Artefatto ad alto valore ergonomico o visivo. Nota: assicurarsi che il colore sia compatibile con la palette stagionale corrente."\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6       \cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6       Sii creativo ma garbato.\cf0 \cb1 \strokec4 \
\cf6 \cb3 \strokec6     `\cf0 \strokec4 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf0 \cb3     \cf2 \strokec2 const\cf0 \strokec4  response = \cf2 \strokec2 await\cf0 \strokec4  ai.models.generateContent(\{\cb1 \
\cb3       model,\cb1 \
\cb3       contents: prompt,\cb1 \
\cb3     \});\cb1 \
\
\cb3     \cf2 \strokec2 return\cf0 \strokec4  response.text || \cf6 \strokec6 `Target: \cf0 \strokec4 $\{receiverName\}\cf6 \strokec6 . Procedere con l'acquisizione dell'asset immediatamente.`\cf0 \strokec4 ;\cb1 \
\cb3   \} \cf2 \strokec2 catch\cf0 \strokec4  (error) \{\cb1 \
\cb3     console.error(\cf6 \strokec6 "Gemini generation failed:"\cf0 \strokec4 , error);\cb1 \
\cb3     \cf2 \strokec2 return\cf0 \strokec4  \cf6 \strokec6 `Target: \cf0 \strokec4 $\{receiverName\}\cf6 \strokec6 . Procedere con l'acquisizione dell'asset immediatamente.`\cf0 \strokec4 ;\cb1 \
\cb3   \}\cb1 \
\cb3 \};\cb1 \
}