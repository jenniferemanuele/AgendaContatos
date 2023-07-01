import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from  './firebase'; // Importe a instância do Firebase já configurada

function ListaContatos() {
  const [contatos, setContatos] = useState([]);
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');

  useEffect(() => {
    const fetchContatos = async () => {
      const querySnapshot = await getDocs(collection(db, 'userphone'));
      const contatosData = [];
      querySnapshot.forEach((doc) => {
        const { name, number } = doc.data();
        contatosData.push({ nome: name, numero: number });
      });
      setContatos(contatosData);
    };

    fetchContatos();
  }, []);

  const adicionarContato = () => {
    if (nome !== '' && numero !== '') {
      const novoContato = { nome, numero };
      setContatos([...contatos, novoContato]);
      setNome('');
      setNumero('');
    }
  };

  return (
    <div className="lista-contatos">
      <h2>Lista de Contatos</h2>
      <ul>
        {contatos.map((contato, index) => (
          <li key={index}>
            Nome: {contato.nome}, Número: {contato.numero}
          </li>
        ))}
      </ul>
      <div className="form">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Número"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
        <button onClick={adicionarContato}>Adicionar</button>
      </div>
    </div>
  );
}

export default ListaContatos;
