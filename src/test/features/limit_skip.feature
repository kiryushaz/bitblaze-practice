Feature: Get products with passing limit and skip params
  Fetch product data with passing limit and skip params

  Scenario: Get 10 items and skip first 10 items
    Given I want to get 10 products
    And I want to skip the first 10 products
    When I make request to get products
    Then I get a response in JSON format
      """
      {"products":\[(?:{"id":\d+.*})*\],"total":\d+,"skip":\d+,"limit":\d+}
      """
    And Product list starts with id 11
    And Products length equals 10

  Scenario: Get all products (limit=0)
    Given I want to get all products
    When I make request to get products
    Then I get a response in JSON format
      """
      {"products":\[(?:{"id":\d+.*})*\],"total":\d+,"skip":\d+,"limit":\d+}
      """
    And Product list starts with id 1
    And Products length equals 194

  Scenario: Skip all products (skip>total)
    Given I want to skip the first 200 products
    When I make request to get products
    Then I get a response in JSON format
      """
      {"products":\[(?:{"id":\d+.*})*\],"total":\d+,"skip":\d+,"limit":\d+}
      """
    And List of products should be empty

  Scenario: Get all products and skip last 20 items
    Given I want to get all products
    And I want to skip the last 20 products
    When I make request to get products
    Then I get a response in JSON format
      """
      {"products":\[(?:{"id":\d+.*})*\],"total":\d+,"skip":\d+,"limit":\d+}
      """
    And Product list ends with id 174
