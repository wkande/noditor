# Architecture

The ***Noditor Module*** pushes error and alert messages directly to a Slack Channel. Memory and CPU stats are pushed through an ***Image API*** before getting forwarded to the Slack Channel as a chart. The ***Image API*** lives on Heroku and is independant of your Node.js Application and the ***Noditor Module***.

```mermaid
graph TB
    A[fa:fa-code Noditor Module.] --> |Memory/CPU| B[fa:fa-code Image API.]
    A -->| Messages | C
    B--> | Chart | C[fa:fa-slack Slack Channel .]
    style A fill:#f9f9,stroke:#333,stroke-width:1px
    style B fill:#f9f9,stroke:#333,stroke-width:1px

```