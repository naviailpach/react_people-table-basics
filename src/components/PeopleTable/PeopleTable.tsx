import classNames from 'classnames';

import React from 'react';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const selectedPerson = people.find(p => p.slug === personSlug);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === selectedPerson?.slug,
            })}
          >
            <td>
              <Link
                to={`../${person.slug}`}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.mother ? (
                <Link
                  to={`../${person.mother?.slug}`}
                  className="has-text-danger"
                >
                  {person.motherName}
                </Link>
              ) : (
                person.motherName || '-'
              )}
            </td>

            <td>
              {person.father ? (
                <Link to={`../${person.father?.slug}`}>
                  {person.fatherName}
                </Link>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
