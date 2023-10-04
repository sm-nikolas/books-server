import { autor } from "../models/Autor.js";

class AutorController {
  static async listarAutores(req, res) {
    try {
      const listarAutores = await autor.find({});
      res.status(200).json(listarAutores);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na requisição` });
    }
  }

  static async listarAutor(req, res) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      res.status(200).json(autorEncontrado);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na requisição` });
    }
  }

  static async cadastrarAutor(req, res) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({
        mensagem: "Autor cadastrado com sucesso!",
        autor: novoAutor,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao cadastrar autor` });
    }
  }

  static async atualizarAutor(req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);

      res.status(200).json({ mensagem: "Autor atualizado com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na atualização` });
    }
  }

  static async removerAutor(req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);

      res.status(200).json({ mensagem: "Autor removido com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na remoção` });
    }
  }
}

export default AutorController;
