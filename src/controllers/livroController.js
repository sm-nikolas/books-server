import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController {
  static async listarLivros(req, res) {
    try {
      const listarLivros = await livro.find({});
      res.status(200).json(listarLivros);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na requisição` });
    }
  }

  static async listarLivro(req, res) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);

      res.status(200).json(livroEncontrado);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na requisição` });
    }
  }

  static async cadastrarLivro(req, res) {
    const novoLivro = req.body;

    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = {
        ...novoLivro,
        autor: { ...autorEncontrado._doc },
      };

      const livroCriado = await livro.create(livroCompleto);

      res.status(201).json({
        mensagem: "Livro cadastrado com sucesso!",
        livro: livroCriado,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao cadastrar livro` });
    }
  }

  static async atualizarLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);

      res.status(200).json({ mensagem: "Livro atualizado com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na atualização` });
    }
  }

  static async removerLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);

      res.status(200).json({ mensagem: "Livro removido com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na remoção` });
    }
  }

  static async listarLivrosPorEditora(req, res) {
    const editora = req.query.editora;
    try {
      const livrosEncontrados = await livro.find({ editora: editora });

      res.status(200).json(livrosEncontrados);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na requisição` });
    }
  }
}

export default LivroController;
