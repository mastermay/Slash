# Slash
A Github issues based blog

## Introduction
Write your blog in github issue, [demo](http://mastermay.github.io/Slash/)

## Usage
### 1. clone this repo
```
git clone git@github.com:mastermay/Slash.git
```
### 2. edit user & repo config, in `src/config.ts`
```
config = {
    user: 'mastermay',  // GitHub user name
    repo: 'Slash',      // GitHub repo name
    per_page: 1,        // page size of homepage
}
```
### 3. build your website
```
npm i
npm run build
```
### 4. move files (`dist/*`) to branch `gh-pages`
### 5. write your blog in github issue :)

## Todo
1. add comments
2. add cache for posts
