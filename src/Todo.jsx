import {useState} from "react";
import "./styles.css";
import {InputTodo} from "./components/inputTodo";
import {CompleteTodos} from "./components/completeTodos";
import {IncompleteTodos} from "./components/incompleteTodos";

export const Todo = () => {
    const [todoText, setTodoText] = useState("");
    const [incompleteTodos, setIncompleteTodos] = useState([]);
    const [completeTodos, setCompleteTodos] = useState([]);

    //入力変更
    const onChangeTodoText = (event) => setTodoText(event.target.value);

    //TODO追加
    const onClickAdd = () => {
        if (todoText === "") return;
        const newTodos = [...incompleteTodos, todoText];
        setIncompleteTodos(newTodos);
        setTodoText("");
    }


    //TODO削除
    const onClickDelete = (index) => {
        const newTodos = [...incompleteTodos];
        newTodos.splice(index, 1);
        setIncompleteTodos(newTodos);
    }

    //TODO完了
    const onClickComplete = (index) => {
        const newIncompleteTodos = [...incompleteTodos];
        newIncompleteTodos.splice(index, 1);

        const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
        setIncompleteTodos(newIncompleteTodos);
        setCompleteTodos(newCompleteTodos);
    }

    const onClickBack = (index) => {
        const newCompleteTodos = [...completeTodos];
        newCompleteTodos.splice(index, 1);

        const newIncompleteTodos = [...incompleteTodos, completeTodos[index]]
        setCompleteTodos(newCompleteTodos);
        setIncompleteTodos(newIncompleteTodos);
    }

    const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;
    return (
        <>
            <InputTodo todoText={todoText} onChange={onChangeTodoText} onClick={onClickAdd}
                       disabled={isMaxLimitIncompleteTodos}/>
            {isMaxLimitIncompleteTodos && (
                <p style={{color: "red"}}>~~タスクを消化しよう！！~~</p>
            )}
            <IncompleteTodos todos={incompleteTodos} onClickComplete={onClickComplete}
                             onClickDelete={onClickDelete}/>
            <CompleteTodos todos={completeTodos} onClickBack={onClickBack}/>
        </>
    );
};