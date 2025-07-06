# About
Project for a private workout database

# Technologies being used

Use [nest-userauth](https://github.com/hblado/nest-userauth) as base for authetincation.

# Exercises Relational Diagram

```mermaid
erDiagram
    User {
        number id
    }

    TrainingPlan {
        number id
        number userId
        string name
        string type
        number repeatEveryWeeks 
        number cycleWeeks
        string createdAt
    }

    TrainingDay {
        number id
        number trainingPlanId
        number dayIndex
        string title
    }

    TrainingExercise {
        number id
        number trainingDayId
        number exerciseId
        number order
        number sets
        number reps
        string observation
    }

    Exercise {
        number id
        string title
        string videoLink
        string[] tags
    }

    User ||--o{ TrainingPlan : has_many
    TrainingPlan ||--o{ TrainingDay : has_many
    TrainingDay ||--o{ TrainingExercise : has_many
    TrainingExercise }o--|| Exercise : references


```

# Plannings

* [ ] All classes and relations
* [ ] All endpoints done
