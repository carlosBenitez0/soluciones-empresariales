# Guía de Commits Convencionales - Soluciones Empresariales

Para mantener una historia limpia y estandarizada en Git y GitHub, todos los commits deben seguir la especificación [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

## Formato del Mensaje de Commit

```
<tipo>(<alcance opcional>): <descripción corta en minúsculas>

[cuerpo opcional explicativo]
```

## Tipos Permitidos (`<tipo>`)

- `feat`: Una nueva funcionalidad para el usuario o sistema (ej. `feat(vacancies): add realtime filter for open job positions`).
- `fix`: Solución de un error o bug (ej. `fix(form): resolve validation error on CV file upload`).
- `docs`: Cambios únicamente en la documentación (ej. `docs: update project setup instructions in README.md`).
- `style`: Cambios de formato, estilos CSS, espaciado que no afectan la lógica del código.
- `refactor`: Refactorización de código que no añade funcionalidades ni corrige bugs.
- `test`: Añadir o corregir pruebas automatizadas (ej. `test(auth): add unit test for enterprise request form`).
- `chore`: Tareas de mantenimiento, actualización de dependencias, scripts de build.

## Ejemplos de Commits

```bash
git commit -m "feat(landing): implement hero section with value proposition"
git commit -m "feat(candidates): add recruitment application form with CV upload"
git commit -m "fix(payroll): correct vacation pay calculation logic"
git commit -m "test(staffing): add unit tests for company staffing request validation"
```
