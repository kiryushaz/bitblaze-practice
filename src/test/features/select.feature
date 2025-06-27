Feature: Select specific data from products
  Fetch product data with specific attributes

  Scenario: Show title and price of the products
    Given I want to see "title" of the products
    And I want to see "price" of the products
    When I make request to get products
    Then I get a response in JSON format
      """
      {"products":\[(?:{"id":\d+.*})*\],"total":\d+,"skip":\d+,"limit":\d+}
      """
    And Product contains attribute "title"
    And Product contains attribute "price"

  Scenario: Select non exist attribute in data
    Given I want to see "notexistskey" of the products
    When I make request to get products
    Then I get a response in JSON format
      """
      {
        "products": \[(?:{"id":\d+.*})*\],
        "total": \d+,
        "skip": \d+,
        "limit": \d+
      }
      """
    And Product not contains attribute "notexistskey"

  Scenario: Select exist and non exist attributes in data
    Given I want to see "notexistskey" of the products
    And I want to see "title" of the products
    When I make request to get products
    Then I get a response in JSON format
      """
      {"products":\[(?:{"id":\d+.*})*\], "total":\d+, "skip":\d+, "limit":\d+}
      """
    And Product contains attribute "title"
    And Product not contains attribute "notexistskey"
