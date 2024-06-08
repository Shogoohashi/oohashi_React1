import "./styles.css";
import {useState} from "react";
import {InputTodo} from "./components/inputTodo";
import {IncompleteTodos} from "./components/incompleteTodos";
import {CompleteTodos} from "./components/completeTodos";

//コンポーネントの定義と初期ステートの設定
export const Todo = () => {
    // TODO入力欄のテキスト
    const [todoText, setTodoText] = useState("");
    // 未完了のTODOリスト
    const [incompleteTodos, setIncompleteTodos] = useState([]);
    // 完了したTODOリスト
    const [completeTodos, setCompleteTodos] = useState([]);

    //入力変更
    // event.target.value: イベントが発生した要素（この場合は入力フィールド）の現在の値を取得
    const onChangeTodoText = (event) => setTodoText(event.target.value);

    //TODO追加
    const onClickAdd = () => {
        // 入力欄が空なら何もしない
        // スプレッド構文(...): 配列やオブジェクトの要素を展開する,配列のすべての要素を新しい配列を取得
        if (todoText === "") return;
        // 未完了TODOリストに新しいTODOを追加
        const newTodos = [...incompleteTodos, todoText];
        // 新しい未完了TODOリストをステートに設定
        setIncompleteTodos(newTodos);
        // 入力欄を空にする
        setTodoText("");
    }

    //TODO削除
    const onClickDelete = (index) => {
        // 未完了TODOリストをコピー
        const newTodos = [...incompleteTodos];
        // 指定されたインデックスのTODOを削除
        newTodos.splice(index, 1);
        // 新しい未完了TODOリストをステートに設定
        setIncompleteTodos(newTodos);
    }

    //TODO完了
    const onClickComplete = (index) => {
        // 未完了TODOリストをコピー
        const newIncompleteTodos = [...incompleteTodos];
        // 指定されたインデックスのTODOを未完了リストから削除
        newIncompleteTodos.splice(index, 1);
        // 完了TODOリストに追加
        const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
        // 新しい未完了TODOリストをステートに設定
        setIncompleteTodos(newIncompleteTodos);
        // 新しい完了TODOリストをステートに設定
        setCompleteTodos(newCompleteTodos);
    }

    //TODOを未完了リストに戻す
    const onClickBack = (index) => {
        // 完了TODOリストをコピー
        const newCompleteTodos = [...completeTodos];
        // 指定されたインデックスのTODOを完了リストから削除
        newCompleteTodos.splice(index, 1);

        // 未完了TODOリストに追加
        const newIncompleteTodos = [...incompleteTodos, completeTodos[index]]
        // 新しい完了TODOリストをステートに設定
        setCompleteTodos(newCompleteTodos);
        // 新しい未完了TODOリストをステートに設定
        setIncompleteTodos(newIncompleteTodos);
    }

    const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;
    return (
        <>
            {/*props を作成。コンポーネントでまとめた*/}
            <InputTodo todoText={todoText} onChange={onChangeTodoText} onClick={onClickAdd} disabled={isMaxLimitIncompleteTodos}/>
            {/*5以上はできない 上限*/}
            {isMaxLimitIncompleteTodos && (
            <p style={{color: "red"}}>登録できるのは５までだから消化して〜〜〜〜〜〜〜〜〜〜〜〜〜</p>
                )}
            <IncompleteTodos todos={incompleteTodos} onClickComplete={onClickComplete} onClickDelete={onClickDelete}/>
            <CompleteTodos todos={completeTodos} onClickBack={onClickBack}/>
        </>
    );
};