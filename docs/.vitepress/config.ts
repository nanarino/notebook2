import { defineConfig } from "vitepress"
const base = "/notebook2/"
const logo = "/favicon.ico"

export default defineConfig({
  base,
  lang: "zh-CN",
  title: "𝔑𝔒𝔗𝔈𝔅𝔒𝔒𝔎Ⅱ",
  lastUpdated: true,
  head: [["link", { rel: "icon", href: (base ?? "/").replace(/\/$/, logo) }]],
  themeConfig: {
    logo,
    socialLinks: [
      // { icon: "gleam", link: "" },
      // { icon: "elixir", link: "" },
      { icon: "github", link: "https://github.com/nanarino" },
      { icon: "twitter", link: "https://twitter.com/kogawananari" },
    ],
    sidebar: {
      "/elixir/": [
        {
          text: "Features",
          items: [
            { text: "install", link: "/elixir/" },
            { text: "basic", link: "/elixir/basic" },
            { text: "types", link: "/elixir/types" },
            { text: "function", link: "/elixir/function" },
          ],
        },
        {
          text: "Phoenix",
          items: [{ text: "document", link: "/elixir/phoenix/" }],
        },
      ],
      "/gleam/": [
        {
          text: "Features",
          items: [
            { text: "install", link: "/gleam/" },
            { text: "basic", link: "/gleam/basic" },
          ],
        },
      ],
    },
    nav: [
      { text: "elixir", link: "/elixir/", activeMatch: "/elixir/" },
      { text: "gleam", link: "/gleam/", activeMatch: "/gleam/" },
    ],
  },
})
