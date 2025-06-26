Feature: Add a new product
  Adding a new product with POST request

  Scenario: Add a new product with title
    Given Attribute "title" with value "BMW Pencil"
    When I make POST request to add product
    Then I get a response in JSON like this
      """
      {"id": 195, "title": "BMW Pencil"}
      """

  Scenario: Add a new product with title
    Given Attribute "nonexistkey" with value "BMW Pencil"
    When I make POST request to add product
    Then I get a response in JSON like this
      """
      {"id": 195}
      """

  Scenario: Add a new product with another id
    Given Attribute "id" with value 199
    Given Attribute "title" with value "BMW Pencil"
    When I make POST request to add product
    Then I get a response in JSON like this
      """
      {"id": 195, "title": "BMW Pencil"}
      """
