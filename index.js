import "dotenv/config";
import express from 'express';
import cloudinary from 'cloudinary';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

app.post('/api/upload', async (req, res) => {
  try {

    const link = req.headers.link;

    if (!link) {
      return res.status(400).json({ error: 'O cabeçalho "link" não foi fornecido.' });
    }


    const resultadoUpload = await cloudinary.uploader.upload(link);

    res.status(200).json(resultadoUpload);
  } catch (error) {
    console.error('Erro durante o upload:', error);
    res.status(500).json({ error: 'Erro durante o upload da imagem.' });
  }
});

app.get('/api/', async(req, res)=>{
    res.status(200).json({message: 'Bem vindo(a) ao CloudiFy - Dev: @daanrox'})
})

app.listen(PORT, async () => {
  console.log(`Servidor está ouvindo na porta ${PORT}`);
});