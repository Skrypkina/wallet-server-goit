const express = require("express");
const costs = require("./src/db/costs/all-costs.json");

const app = express();

app.get("/costs/:id", (req, res) => {
  let requestedCost = costs.find(cost => cost.id === Number(req.params.id));
  if (!requestedCost) {
    return res.send({
      status: "no products",
      products: []
    });
  }
  let respons = {
    status: "success",
    products: requestedCost
  };
  res.send(respons);
});

app.get("/costs", (req, res) => {
  let requestedCategory = costs.filter(cost =>
    cost.categories.includes(req.query.categories)
  );

  if (!req.query.categories) {
    return res.send(costs);
  }
  let respons = {
    status: "success",
    products: requestedCategory
  };
  res.send(respons);
});

app.listen(8080, () => {
  console.log("server is running");
});
