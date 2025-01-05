import type {ReactNode} from 'react';
import Greeting from '@site/src/components/Greeting';
import Layout from '@theme/Layout';

import styles from './index.module.css';
import BlogCard from '@site/src/components/BlogCard';


type BlogArticle = {
  title: string;
  postedAt: string;
  thumbnail: string;
  link: string;
}

const outputs: BlogArticle[]= [
  {
    title: "国内ECモール連携が主であるシステムで、グローバルなECモール連携を実現する際に生じた問題とその解決方法 - バイセル Tech Blog",
    postedAt: "2024-12-03",
    thumbnail: "/img/blog/bst-foreign-ec-mall.png",
    link: "https://tech.buysell-technologies.com/entry/adventcalendar2024-12-03",
  },
  {
    title: "親子関係のあるデータの検索を、ElasticsearchのJoin field typeを使って実現した",
    postedAt: "2024-10-19",
    thumbnail: "/img/blog/zenn-article-elasticsearch-parent-child-search.png",
    link: "https://zenn.dev/buyselltech/articles/db14b7f21c28e7",
  },
  {
    title: "LeetCode: 122. Best Time to Buy and Sell Stock II をGoで解く",
    postedAt: "2024-09-29",
    thumbnail: "/img/blog/zenn-article-leet-code122.png",
    link: "https://zenn.dev/ryota_onuma/articles/6f5439ada968d7",
  },
  {
    title: "LeetCode: 121. Best Time to Buy and Sell Stock をGoで解く",
    postedAt: "2024-09-29",
    thumbnail: "/img/blog/zenn-article-leet-code121.png",
    link: "https://zenn.dev/ryota_onuma/articles/c050d03d6f3bae",
  },
  {
    title: "LeetCode: 189. Rotate Array をGoで解く",
    postedAt: "2024-09-23",
    thumbnail: "/img/blog/zenn-article-leet-code189.png",
    link: "https://zenn.dev/ryota_onuma/articles/b12e4e994a2245",
  },
  {
    title: "LeetCode: 169. Majority Element をGoで解く",
    postedAt: "2024-09-23",
    thumbnail: "/img/blog/zenn-article-leet-code189.png",
    link: "https://zenn.dev/ryota_onuma/articles/b0fa3fc1173648",
  },
  {
    title: "サービス運用の負担軽減に繋がった、Playwrightの紹介 - バイセル Tech Blog",
    postedAt: "2024-12-03",
    thumbnail: "/img/blog/bst-playwright.png",
    link: "https://tech.buysell-technologies.com/entry/adventcalendar2024-12-03",
  },
  {
    title: "プレ負荷テストの導入が、新規開発プロジェクトの負荷テストを円滑にした体験談 - バイセル Tech Blog",
    postedAt: "2023-10-30",
    thumbnail: "/img/blog/bst-pre-load-test.png",
    link: "https://tech.buysell-technologies.com/entry/2023/10/30/102458",
  },
  {
    title: "HasuraのRemote Schema to Database Relationshipsを用いたElasticsearchとの検索連携 - バイセル Tech Blog",
    postedAt: "2023-02-28",
    thumbnail: "/img/blog/bst-remote-schema-to-database-relationship.png",
    link: "https://tech.buysell-technologies.com/entry/2023/02/28/080000",
  },
  {
    title: "リファイメントとプランニングを改善することで、チームの属人化が解消された話 - バイセル Tech Blog",
    postedAt: "2022-12-03",
    thumbnail: "/img/blog/bst-refinement-planning.png",
    link: "https://tech.buysell-technologies.com/entry/adventcalendar2022-12-03",
  },
  {
    title: "Hasura CLIで挿入するマスタデータをスプレッドシート管理に移行させたので振り返ってみた - バイセル Tech Blog",
    postedAt: "2022-07-30",
    thumbnail: "/img/blog/bst-hasura-spreadsheet.png",
    link: "https://tech.buysell-technologies.com/entry/2022/07/30/153326",
  },
  {
    title: "在庫管理システムの本番環境DBアップグレードを振り返ってみる - バイセル Tech Blog",
    postedAt: "2022-01-26",
    thumbnail: "/img/blog/bst-db-upgrade.png",
    link: "https://tech.buysell-technologies.com/entry/2022/01/26/202243",
  },
  {
    title: "CircleCIで構築されたCI/CD環境をGitHub Actionsに移行した際のポイント - バイセル Tech Blog",
    postedAt: "2021-12-05",
    thumbnail: "/img/blog/bst-circleci.png",
    link: "https://tech.buysell-technologies.com/entry/adventcalendar2021-12-05",
  },
  {
    title: "バイセルの内定者インターン with コロナってどんなことするの？？ - バイセル Tech Blog",
    postedAt: "2020-12-21",
    thumbnail: "/img/blog/bst-intern.png",
    link: "https://tech.buysell-technologies.com/entry/2020/12/21/092653",
  },
  
]

export default function Home(): ReactNode {
  return (
    <Layout
      title={`Top`}
      description="Description will go into a meta tag in <head />">
      <main className={styles.main}>
        <Greeting />
        <section className={styles.outputs}>
          <h1 className={styles.heading}>Blog</h1>
          <div className={styles.cards}>
          {outputs.map((article, index) => (
            <BlogCard article={article} key={index} />
          ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
