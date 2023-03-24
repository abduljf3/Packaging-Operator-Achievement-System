function Delete() {
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      axios.get('/api/items').then(response => {
        setItems(response.data);
      }).catch(error => {
        console.error(error);
      });
    }, []);
  
    const handleDelete = (id) => {
      axios.delete(`/api/items/${id}`).then(response => {
        console.log(response.data);
        setItems(items.filter(item => item.id !== id));
      }).catch(error => {
        console.error(error);
      });
    }
  
    return (
      <div>
        {items.map(item => (
          <div key={item.id}>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  }
  
  export default Delete;