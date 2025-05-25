package com.polsl.tab.zoobackend.mapper;

import com.polsl.tab.zoobackend.dto.feeding.FeedingRequest;
import com.polsl.tab.zoobackend.dto.feeding.FeedingResponse;
import com.polsl.tab.zoobackend.model.Animal;
import com.polsl.tab.zoobackend.model.Feeding;
import com.polsl.tab.zoobackend.model.FoodType;
import com.polsl.tab.zoobackend.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import java.util.stream.Collectors;
import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface FeedingMapper {
    @Mapping(source = "foodType.id", target = "foodTypeId")
    @Mapping(source = "animals", target = "animalIds")
    @Mapping(source = "feedingUsers", target = "userIds")
    @Mapping(target = "enclosureId", expression = "java(mapEnclosureId(feeding.getAnimals()))")
    FeedingResponse toResponse(Feeding feeding);

    @Mapping(source = "foodTypeId", target = "foodType")
    @Mapping(source = "animalIds", target = "animals")
    @Mapping(source = "userIds", target = "feedingUsers")
    Feeding toEntity(FeedingRequest dto);

    void updateEntity(@MappingTarget Feeding target, FeedingRequest source);

    default FoodType mapFoodType(Long id) {
        if (id == null) return null;
        FoodType f = new FoodType(); f.setId(id); return f;
    }
    default Set<Animal> mapAnimals(Set<Long> ids) {
        if (ids == null) return Set.of();
        return ids.stream().map(i -> { Animal a = new Animal(); a.setId(i); return a; }).collect(Collectors.toSet());
    }
    default Set<User> mapUsers(Set<Long> ids) {
        if (ids == null) return Set.of();
        return ids.stream().map(i -> { User u = new User(); u.setId(i); return u; }).collect(Collectors.toSet());
    }
    default Long mapFoodTypeId(FoodType f) { return f == null ? null : f.getId(); }
    default Set<Long> mapAnimalIds(Set<Animal> set) {
        if (set == null) return Set.of();
        return set.stream().map(Animal::getId).collect(Collectors.toSet());
    }
    default Set<Long> mapUserIds(Set<User> set) {
        if (set == null) return Set.of();
        return set.stream().map(User::getId).collect(Collectors.toSet());
    }

    default Long mapEnclosureId(Set<Animal> animals) {
        if (animals == null || animals.isEmpty()) return null;
        Animal firstAnimal = animals.iterator().next();
        return (firstAnimal.getEnclosure() != null) ? firstAnimal.getEnclosure().getId() : null;
    }
}