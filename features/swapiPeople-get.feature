Feature: Example 1 to actions
  In order to know Starwars info
@smoke
  Scenario: starwars characters
    Given A Character id 1
    When get swapi is call
    Then return "Luke Skywalker" in name field

@regression
  Scenario: starwars characters
    Given A Character id 2
    When get swapi is call
    Then return "C-3PO" in name field
