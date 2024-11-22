Feature: Example 1 to actions
  In order to know Starwars info
@smoke
  @luke
  Scenario: starwars characters
    Given A Character id 1
    When get swapi is call
    Then return "Luke Skywalker" in name field
  @c3po
  Scenario: starwars characters
    Given A Character id 2
    When get swapi is call
    Then return "C-3PO" in name field

@regression
  @r2d2
  Scenario: starwars characters
    Given A Character id 3
    When get swapi is call
    Then return "R2-D2" in name field
  @vader
  Scenario: starwars characters
    Given A Character id 4
    When get swapi is call
    Then return "Darth Vader" in name field
