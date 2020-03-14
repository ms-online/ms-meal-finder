// 第一步 获得节点
const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

// 第三步 创建searchMeal函数并通过fetch API 获得食谱数据
function searchMeal(e) {
  e.preventDefault();
  // 清空single meal 的内容
  single_mealEl.innerHTML = "";

  // 获得search 输入框的值
  const term = search.value;
  //   console.log(term);

  //   检查是否为空
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        resultHeading.innerHTML = `<h2>${term}的查询结果为：</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `<p>没有查询到相关食谱，请重新输入！</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              meal => `
            <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-info" data-mealId = "${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
            </div>
            </div>
            
            `
            )
            .join("");
        }
      });

    //   清空search
    search.value = "";
  } else {
    alert("请输入搜索的内容");
  }
}

// 第二步 设置事件监听
submit.addEventListener("submit", searchMeal);
