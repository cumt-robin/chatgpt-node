import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const es = new EventSource(`/api/generate?animal=${animalInput}`)

    let content = result;

    es.onmessage = (e) => {
      console.log(e.data)
      if (e.data === '[DONE]') {
        es.close()
        return;
      }
      const text = JSON.parse(e.data).choices[0].text
      console.log(text)
      content += text;

      setResult(content);
    }

    es.onopen = () => {
      setAnimalInput("");
    }

    // const response = await fetch("/api/generate", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ animal: animalInput }),
    // });
    // const reader = response.body.getReader();

    // let content = result;

    // // read() 返回了一个 promise
    // // 当数据被接收时 resolve
    // reader.read().then(function processText({ done, value }) {
    //   // Result 对象包含了两个属性：
    //   // done  - 当 stream 传完所有数据时则变成 true
    //   // value - 数据片段。当 done 为 true 时始终为 undefined
    //   if (done) {
    //     console.log("Stream complete", value);
    //     return;
    //   }

    //   // value for fetch streams is a Uint8Array
    //   let str = ''

    //   for (var i = 0; i < value.length; i++) {
    //     str += String.fromCharCode(value[i]);
    //   }

    //   if (str === 'data: [DONE]') {
    //     console.log("data done")
    //     return;
    //   }

    //   try {
    //     const jsonData = JSON.parse(str.replace(/data\: |\n/g, ''))
          
    //     let text = jsonData.choices[0].text

    //     content += text;

    //     setResult(content);

    //     // 再次调用这个函数以读取更多数据
    //     return reader.read().then(processText);
    //   } catch (error) {
    //     console.error(error, str)
    //   }
    // });
    // setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
