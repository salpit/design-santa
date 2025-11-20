{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue255;\red255\green255\blue254;\red0\green0\blue0;
\red144\green1\blue18;\red15\green112\blue1;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c100000;\cssrgb\c100000\c100000\c99608;\cssrgb\c0\c0\c0;
\cssrgb\c63922\c8235\c8235;\cssrgb\c0\c50196\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 import\cf0 \strokec4  \{ defineConfig, loadEnv \} \cf2 \strokec2 from\cf0 \strokec4  \cf5 \strokec5 'vite'\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 import\cf0 \strokec4  react \cf2 \strokec2 from\cf0 \strokec4  \cf5 \strokec5 '@vitejs/plugin-react'\cf0 \cb1 \strokec4 \
\
\cf6 \cb3 \strokec6 // https://vitejs.dev/config/\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 default\cf0 \strokec4  defineConfig((\{ mode \}) => \{\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  env = loadEnv(mode, process.cwd(), \cf5 \strokec5 ''\cf0 \strokec4 );\cb1 \
\cb3   \cf2 \strokec2 return\cf0 \strokec4  \{\cb1 \
\cb3     plugins: [react()],\cb1 \
\cb3     define: \{\cb1 \
\cb3       \cf5 \strokec5 'process.env'\cf0 \strokec4 : env\cb1 \
\cb3     \}\cb1 \
\cb3   \}\cb1 \
\cb3 \})\cb1 \
}