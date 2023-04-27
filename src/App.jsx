import { useState, useEffect } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    restrictions: [],
  });
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(storedRecipes);
  }, []);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const handleAddRecipe = (event) => {
    event.preventDefault();
    setRecipes([...recipes, newRecipe]);
    setNewRecipe({
      name: "",
      ingredients: "",
      instructions: "",
      restrictions: [],
      });
      setShowAddRecipe(false);
      };
      
      const handleEditRecipe = (index, updatedRecipe) => {
      const newRecipes = [...recipes];
      newRecipes[index] = updatedRecipe;
      setRecipes(newRecipes);
      };
      
      const handleDeleteRecipe = (index) => {
      const newRecipes = [...recipes];
      newRecipes.splice(index, 1);
      setRecipes(newRecipes);
      };
      
      const handleFilterChange = (event) => {
      setFilter(event.target.value);
      };
      
      const filteredRecipes = recipes.filter((recipe) => {
      if (filter === "Todas as receitas") {
      return true;
      } else if (filter === "Sem Glúten") {
      return !recipe.restrictions.includes("Sem Lactose");
      } else if (filter === "Sem Lactose") {
      return !recipe.restrictions.includes("Sem Glúten");
      }
      });
      
      return (
      <div className="container">
      <h1>Seja bem vindo ao Lab Receitas!</h1>
      <div className="header">
      <h2>Tenha todas as suas receitas na palma da mão</h2>
      <img src="/logolabreceitas.png" alt="LogoLabReceitas" style={{ width: '200px', height: '200px' }} />
      <p>Cadastre, exclua e edite! Aproveite!</p>
      <p>Obs: Para filtrar as receitas que não possuem Glúten e Lactose, selecione a opção "Todas as Receitas". </p>
      </div>
      <div className="filter">
  <input type="radio" id="filter-gluten" name="filter" value="Sem Glúten" checked={filter === "Sem Glúten"} onChange={handleFilterChange} />      
  <label htmlFor="filter-gluten">Sem Glúten</label>
  
  <input type="radio" id="filter-lactose" name="filter" value="Sem Lactose" checked={filter === "Sem Lactose"} onChange={handleFilterChange} />
  <label htmlFor="filter-lactose">Sem Lactose</label>

  <input type="radio" id="filter-all" name="filter" value="Todas as receitas" checked={filter === "Todas as receitas"} onChange={handleFilterChange} />
  <label htmlFor="filter-all">Todas as receitas</label>
 
</div>
      <div>
      {filteredRecipes.map((recipe, index) => (
      <div key={index} className="recipe">
      <h2>{recipe.name}</h2>
      <p>{recipe.ingredients}</p>
      <p>{recipe.instructions}</p>
      <p>{recipe.restrictions.join(", ")}</p>
      <button
      className="button"
      onClick={() => {
      const updatedRecipe = prompt("Editar receita", JSON.stringify(recipe));
      if (updatedRecipe) {
      handleEditRecipe(index, JSON.parse(updatedRecipe));
      }
      }}
      >
      ! Editar
      </button>
      <button className="button" onClick={() => handleDeleteRecipe(index)}>
      X Excluir
      </button>
      </div>
      ))}
      </div>
      <button
      className="button"
      onClick={() => setShowAddRecipe(true)}
      style={{ marginTop: "20px" }}
      >
      Adicionar Receita
      </button>
      <div className="add-recipe" style={{ display: showAddRecipe ? "flex" : "none" }}>
      <form onSubmit={handleAddRecipe}>
      <label htmlFor="new-recipe-name">Nome:</label>
      <input
      id="new-recipe-name"
      value={newRecipe.name}
      onChange={(event) => setNewRecipe({ ...newRecipe, name: event.target.value })}
      required
      />
      <label htmlFor="new-recipe-ingredients">Ingredientes:</label>
      <textarea
      id="new-recipe-ingredients"
      value={newRecipe.ingredients}
      onChange={(event) =>
      setNewRecipe({ ...newRecipe,ingredients: event.target.value })
    }
    required
    />
    <label htmlFor="new-recipe-instructions">Modo de Preparo:</label>
    <textarea
    id="new-recipe-instructions"
    value={newRecipe.instructions}
    onChange={(event) =>
    setNewRecipe({ ...newRecipe, instructions: event.target.value })
    }
    required
    />
    <label htmlFor="new-recipe-restrictions">Restrições</label>
    <div className="restrictions">
  
    <label htmlFor="Sem Glúten">Sem Glúten:</label>
  <input 
    type="checkbox" 
    id="Sem Glúten"
    checked={newRecipe.restrictions.includes("Sem Glúten")}
    onChange={(event) => {
      if (event.target.checked) {
        setNewRecipe({...newRecipe, restrictions: [...newRecipe.restrictions, "Sem Glúten"]});
      } else {
        setNewRecipe({...newRecipe, restrictions: newRecipe.restrictions.filter(r => r !== "Sem Glúten")});
      }
    }}
  />
  
  <label htmlFor="Sem Lactose">Sem Lactose:</label>
  <input 
    type="checkbox" 
    id="Sem Lactose"
    checked={newRecipe.restrictions.includes("Sem Lactose")}
    onChange={(event) => {
      if (event.target.checked) {
        setNewRecipe({...newRecipe, restrictions: [...newRecipe.restrictions, "Sem Lactose"]});
      } else {
        setNewRecipe({...newRecipe, restrictions: newRecipe.restrictions.filter(r => r !== "Sem Lactose")});
      }
    }}
  />
 
</div>
    <div className="add-recipe-buttons">
    <button className="button" type="submit">
    Adicionar
    </button>
    <button
    className="button"
    type="button"
    onClick={() => setShowAddRecipe(false)}
    >
    Cancelar
    </button>
    </div>
    </form>
    </div>
    </div>
    );
    };
    
    export default App;