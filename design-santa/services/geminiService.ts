import { GoogleGenAI } from "@google/genai";

// Accesso sicuro alla variabile d'ambiente.
// Nota: Vite sostituirà 'process.env.API_KEY' con il valore stringa durante la build.
const GEMINI_API_KEY = process.env.API_KEY || '';

export const generateMissionBrief = async (receiverName: string): Promise<string> => {
  if (!GEMINI_API_KEY) {
    console.warn("API_KEY mancate. Modalità fallback attiva.");
    return `Obiettivo: ${receiverName}. Il modulo AI è offline (Chiave API mancante). Improvvisa un regalo con creatività analogica.`;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    // Usiamo un modello standard stabile.
    const model = "gemini-2.5-flash";
    
    const prompt = `
      Sei un sistema di gestione protocolli tecnico per un gruppo di Designer.
      Il tuo compito è assegnare un obiettivo per il Secret Santa (chiamato in codice "Protocollo X-MAS").
      
      Il destinatario (Target) è: ${receiverName}.
      
      Genera un "Mission Brief" in ITALIANO (max 3-4 frasi).
      
      CRITICO: 
      - L'ironia deve essere LEGGERA, DIVERTENTE e MAI offensiva. 
      - Rispetta sempre la sensibilità del singolo. Evita sarcasmo pungente.
      
      Tono di voce:
      - Tecnico, analitico, "nerd" del design.
      - Gioca in modo simpatico sulle passioni comuni dei designer (Pantone, griglie, font, cancelleria, ispirazione).
      - Non usare la parola "Regalo". Usa termini come "Asset Tangibile", "Artefatto", "Upgrade Analogico", "Deploy Festivo".
      
      Esempio sicuro e divertente:
      "Il sistema rileva la necessità di un upgrade estetico sulla scrivania del Target. Si consiglia l'acquisizione di un Artefatto ad alto valore ergonomico o visivo. Nota: assicurarsi che il colore sia compatibile con la palette stagionale corrente."
      
      Sii creativo ma garbato.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || `Target: ${receiverName}. Procedere con l'acquisizione dell'asset immediatamente.`;
  } catch (error) {
    console.error("Gemini generation failed:", error);
    return `Target: ${receiverName}. Procedere con l'acquisizione dell'asset immediatamente. (Errore connessione AI)`;
  }
};
