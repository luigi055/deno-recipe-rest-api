# Recipe Rest API

Simple REST API made in DENO

## Installing Deno

Follow the instructions from the [Deno's installation guide](https://deno.land/#installation)

## Run the server

```
deno run --allow-net --allow-read server.ts
```

## Recipe resource routes

```
GET      /api/v1/recipes
GET      /api/v1/recipes/:id
POST     /api/v1/recipes
PUT      /api/v1/recipes/:id
DELETE   /api/v1/recipes/:id
```
