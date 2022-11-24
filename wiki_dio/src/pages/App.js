import { useState } from "react"
import gitIcon from "../assets/github.svg"
import { Container } from "./styles";
import Input from "../components/Input/Input"
import ItemRepo from "../components/ItemRepo/ItemRepo";
import Button from "../components/Button/Button";
import  { api } from "../Services/api"

function App() {

  const [currentRepo, setCurrentRepo] = useState("")
  const [repos, setRepos] = useState([]);
  


  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`)

    if(data.id) {

      const isExist = repos.find(repo => repo.id === data.id)
      if(!isExist){
        setRepos(prev => [...prev, data])
      setCurrentRepo("")
      return
      }
    }

    alert("Repositorio nao encontrado")
  }

  const handleRemoveRepo = (id) => {
      console.log("removendo elemento por id", id)
  }


  return (
    <Container>
      <img src ={gitIcon} witdh={72} height={72} alt="gitIcon" />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
    </Container>
  );
}

export default App;
