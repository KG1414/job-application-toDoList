import { List } from 'semantic-ui-react'
import './Item.css';

const Item = ({ id, description, completed, deleteItem, toggleDone }) => {
    if (!completed) {
        return (
            <List.Item>
                <List.Content floated='right'>
                    <i
                        className="fa-solid fa-delete-left circle fa-lg"
                        style={{ cursor: "pointer", paddingTop: "0.2rem" }}
                        onClick={() => deleteItem(id)}>
                    </i>
                </List.Content>
                <List.Content floated="left">
                    <input
                        style={{ marginTop: "5px" }}
                        type="checkbox"
                        checked={completed ? true : false}
                        onChange={(e) => toggleDone(e, id)}>
                    </input>
                </List.Content>
                <List.Content>
                    <h3>{description}</h3>
                    <div className="description">{completed ? "completed" : "to be completed"}</div>
                </List.Content>
                <List.Content floated="right">
                    <div className="description">Updated 10 mins ago</div>
                </List.Content>
            </List.Item>
        )
    };
};

export default Item;