{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue255;\red255\green255\blue254;\red0\green0\blue0;
\red14\green110\blue109;\red144\green1\blue18;\red15\green112\blue1;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c100000;\cssrgb\c100000\c100000\c99608;\cssrgb\c0\c0\c0;
\cssrgb\c0\c50196\c50196;\cssrgb\c63922\c8235\c8235;\cssrgb\c0\c50196\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4  \cf5 \strokec5 DESIGNERS\cf0 \strokec4  = [\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf6 \strokec6 "Ivana Cassaniti"\cf0 \strokec4 ,\cb1 \
\cb3   \cf6 \strokec6 "Salvo Pitingaro"\cf0 \strokec4 ,\cb1 \
\cb3   \cf6 \strokec6 "Martina Africa Meo"\cf0 \strokec4 ,\cb1 \
\cb3   \cf6 \strokec6 "Benedetta Ajello"\cf0 \strokec4 ,\cb1 \
\cb3   \cf6 \strokec6 "Erica Colombo"\cf0 \strokec4 ,\cb1 \
\cb3   \cf6 \strokec6 "Chiara Libralon"\cf0 \strokec4 ,\cb1 \
\cb3   \cf6 \strokec6 "Federica Zerbini"\cf0 \strokec4 ,\cb1 \
\cb3   \cf6 \strokec6 "Lorenzo Giampietri"\cf0 \strokec4 ,\cb1 \
\cb3   \cf6 \strokec6 "Alessia Damone"\cf0 \strokec4 ,\cb1 \
\cb3   \cf6 \strokec6 "Ester Valorio"\cf0 \strokec4 ,\cb1 \
\cb3   \cf6 \strokec6 "Giulia Compri"\cf0 \cb1 \strokec4 \
\cb3 ] \cf2 \strokec2 as\cf0 \strokec4  \cf2 \strokec2 const\cf0 \strokec4 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 type\cf0 \strokec4  \cf5 \strokec5 DesignerName\cf0 \strokec4  = \cf2 \strokec2 typeof\cf0 \strokec4  \cf5 \strokec5 DESIGNERS\cf0 \strokec4 [\cf2 \strokec2 number\cf0 \strokec4 ];\cb1 \
\
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 interface\cf0 \strokec4  \cf5 \strokec5 Assignment\cf0 \strokec4  \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   santa: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   receiver: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   timestamp: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3   mission_brief?: \cf2 \strokec2 string\cf0 \strokec4 ;\cb1 \
\cb3 \}\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf7 \cb3 \strokec7 // Supabase table structure assumption:\cf0 \cb1 \strokec4 \
\cf7 \cb3 \strokec7 // table name: 'secret_santa_assignments'\cf0 \cb1 \strokec4 \
\cf7 \cb3 \strokec7 // columns: id (int8), created_at (timestamptz), santa (text), receiver (text), mission_brief (text)\cf0 \cb1 \strokec4 \
\
}