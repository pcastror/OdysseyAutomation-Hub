Feature: Example 1 to actions
  In order to know Starwars info

  Scenario: starwars characters
    Given A Character id 1
    When get swapi is call
    Then return "Luke" in name field
